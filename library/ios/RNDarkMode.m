#import <UIKit/UIKit.h>

#import "RNDarkMode.h"

@implementation RNDarkMode
{
	bool hasListeners;
}

- (id)init
{
	self = [super init];

	if (self) {
		[UIScreen setCurrentManager:self];
	}

	return self;
}

RCT_EXPORT_MODULE();

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getCurrentStyle)
{
	return [UIScreen getCurrentStyle];
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

+ (BOOL)requiresMainQueueSetup
{
	return YES;
}

@end
