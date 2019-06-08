#import <objc/runtime.h>

#import "UIScreen+RNDarkModeTraitChangeListener.h"

@implementation UIScreen (RNDarkModeTraitChangeListener)

static NSString *currentMode = @"light";
static RNDarkMode *currentManager = NULL;

+ (void)load
{
	if (@available(iOS 13.0, *)) {
		currentMode = [UIScreen parseTraitCollection:UITraitCollection.currentTraitCollection];
	}

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

- (void)newTraitCollectionDidChange:(UITraitCollection *)previousTraitCollection
{
	[self newTraitCollectionDidChange:previousTraitCollection];
	
	if (@available(iOS 13.0, *)) {
		if ([self.traitCollection hasDifferentColorAppearanceComparedToTraitCollection:previousTraitCollection]) {
			NSString *newStyle = [UIScreen parseTraitCollection:self.traitCollection];
			[UIScreen updateCurrentStyle:newStyle];
		}
	}
}

+ (NSString *)parseTraitCollection:(UITraitCollection *)traitCollection
{
	if (@available(iOS 12.0, *)) {
		return traitCollection.userInterfaceStyle == UIUserInterfaceStyleDark ? @"dark" : @"light";
	} else {
		return @"light";
	}
}

+ (NSString *)getCurrentMode
{
	return currentMode;
}

+ (void)updateCurrentStyle:(NSString *)newMode
{
	currentMode = newMode;
	if (currentManager) {
		[currentManager currentModeChanged:newMode];
	}
}

+ (void)setCurrentManager:(RNDarkMode *)manager
{
	currentManager = manager;
}

@end
