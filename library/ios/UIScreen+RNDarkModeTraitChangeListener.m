#import <objc/runtime.h>

#import "UIScreen+RNDarkModeTraitChangeListener.h"

@implementation UIScreen (RNDarkModeTraitChangeListener)

static NSString *currentStyle = @"light";
static RNDarkMode *currentManager = NULL;

+ (void)load
{
	currentStyle = [UIScreen parseTraitCollection:UITraitCollection.currentTraitCollection];

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
	
	if ([self.traitCollection hasDifferentColorAppearanceComparedToTraitCollection:previousTraitCollection]) {
		NSString *newStyle = [UIScreen parseTraitCollection:self.traitCollection];
		[UIScreen updateCurrentStyle:newStyle];
	}
}

+ (NSString *)parseTraitCollection:(UITraitCollection *)traitCollection
{
	return traitCollection.userInterfaceStyle == UIUserInterfaceStyleDark ? @"dark" : @"light";
}

+ (NSString *)getCurrentStyle
{
	return currentStyle;
}

+ (void)updateCurrentStyle:(NSString *)newStyle
{
	currentStyle = newStyle;
	if (currentManager) {
		[currentManager currentStyleChanged:newStyle];
	}
}

+ (void)setCurrentManager:(RNDarkMode *)manager
{
	currentManager = manager;
}

@end
