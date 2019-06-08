#import <objc/runtime.h>

#import "UIScreen+RNDarkModeTraitChangeListener.h"

@implementation UIScreen (RNDarkModeTraitChangeListener)

static RNDarkModeMode currentMode = RNDarkModeModeLight;
static RNDarkMode *currentManager = NULL;

+ (void)load
{
	if (@available(iOS 13.0, *)) {
		static dispatch_once_t token;
		dispatch_once(&token, ^{
			SEL originalMethodSelector = @selector(traitCollectionDidChange:);
			SEL newMethodSelector = @selector(newTraitCollectionDidChange:);
			Method originalMethod = class_getInstanceMethod(self, originalMethodSelector);
			Method newMethod = class_getInstanceMethod(self, newMethodSelector);
			
			BOOL methodAdded = class_addMethod([self class], originalMethodSelector, method_getImplementation(newMethod), method_getTypeEncoding(newMethod));
			
			if (methodAdded) {
				class_replaceMethod([self class], newMethodSelector, method_getImplementation(originalMethod), method_getTypeEncoding(originalMethod));
			} else {
				method_exchangeImplementations(originalMethod, newMethod);
			}
		});
	}
}

- (void)newTraitCollectionDidChange:(UITraitCollection *)previousTraitCollection
{
	[self newTraitCollectionDidChange:previousTraitCollection];

	[UIScreen parseCurrentTraitCollection:self.traitCollection];
}

+ (void)parseCurrentTraitCollection:(UITraitCollection *)traitCollection
{
	if (@available(iOS 13.0, *)) {
		UIUserInterfaceStyle traitStyle = traitCollection.userInterfaceStyle;
		UIUserInterfaceStyle currentStyle = currentMode == RNDarkModeModeDark ? UIUserInterfaceStyleDark : UIUserInterfaceStyleLight;
		if (traitStyle != currentStyle) {
			RNDarkModeMode newMode = traitStyle == UIUserInterfaceStyleDark ? RNDarkModeModeDark : RNDarkModeModeLight;
			[UIScreen updateCurrentStyle:newMode];
		}
	}
}

+ (NSString *)getCurrentMode
{
	if (@available(iOS 13.0, *)) { // TODO: Remove when simulator bug is fixed
		static BOOL hasRun = NO;
		if (!hasRun) {
			[UIScreen parseCurrentTraitCollection:UITraitCollection.currentTraitCollection];
			hasRun = YES;
		}
	}

	return [UIScreen parseCurrentMode];
}

+ (NSString *)parseCurrentMode
{
	if (currentMode == RNDarkModeModeDark) {
		return @"dark";
	}

	return @"light";
}

+ (void)updateCurrentStyle:(RNDarkModeMode)newMode
{
	currentMode = newMode;
	if (currentManager) {
		[currentManager currentModeChanged:[UIScreen parseCurrentMode]];
	}
}

+ (void)setCurrentManager:(RNDarkMode *)manager
{
	currentManager = manager;
}

@end
