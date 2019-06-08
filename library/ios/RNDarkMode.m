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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(getCurrentMode)
{
	return [UIScreen getCurrentMode];
}

- (NSArray<NSString *> *)supportedEvents
{
	return @[@"currentModeChanged"];
}

- (void)currentModeChanged:(NSString *)newMode
{
	if (hasListeners) {
		[self sendEventWithName:@"currentModeChanged" body:newMode];
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
