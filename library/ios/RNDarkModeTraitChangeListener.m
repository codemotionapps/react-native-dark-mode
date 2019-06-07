#import "RNDarkModeTraitChangeListener.h"

@implementation RNDarkModeTraitChangeListener

- (id)initWithModule:(RNDarkMode *)module
{
	self = [super init];

	if (self) {
		[[[[[[UIApplication sharedApplication] delegate] window] rootViewController] view] addSubview:self];
		self.module = module;
		self.currentStyle = [self parseCurrentStyle];
	}

	return self;
}

- (NSString *)parseCurrentStyle
{
	return self.traitCollection.userInterfaceStyle == UIUserInterfaceStyleDark ? @"dark" : @"light";
}

- (void)traitCollectionDidChange:(UITraitCollection *)previousTraitCollection
{
	[super traitCollectionDidChange:previousTraitCollection];

	if ([self.traitCollection hasDifferentColorAppearanceComparedToTraitCollection:previousTraitCollection]) {
		NSString *newStyle = [self parseCurrentStyle];
		self.currentStyle = newStyle;
		[self.module currentStyleChanged:newStyle];
	}
}

@end
