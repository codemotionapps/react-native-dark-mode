#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RNDarkMode : RCTEventEmitter <RCTBridgeModule>

- (void)currentStyleChanged:(NSString *)style;

@end
