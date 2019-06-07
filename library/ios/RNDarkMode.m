#import <UIKit/UIKit.h>

#import "RNDarkMode.h"
#import "RNDarkModeTraitChangeListener.h"

@implementation RNDarkMode
{
	RNDarkModeTraitChangeListener *listener;
	bool hasListeners;
}

- (id)init
{
	self = [super init];

	if (self) {
		self->listener = [[RNDarkModeTraitChangeListener alloc] initWithModule:self];
	}

	return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getCurrentStyle)
{
	return listener.currentStyle;
}

- (NSArray<NSString *> *)supportedEvents
{
	return @[@"currentStyleChanged"];
}

- (void)currentStyleChanged:(NSString *)style
{
	if (hasListeners) {
		[self sendEventWithName:@"currentStyleChanged" body:style];
	}
}

- (void)startObserving
{
	hasListeners = YES;
}

- (void)stopObserving
{
	hasListeners = NO;
}

- (void)invalidate
{
	dispatch_async(dispatch_get_main_queue(), ^{
		[self->listener removeFromSuperview];
	});
}

+ (BOOL)requiresMainQueueSetup
{
	return YES;
}

@end
