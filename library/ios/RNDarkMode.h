#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#import "UIScreen+RNDarkModeTraitChangeListener.h"

@interface RNDarkMode : RCTEventEmitter <RCTBridgeModule>

- (void)currentModeChanged:(NSString *)newMode;

@end
