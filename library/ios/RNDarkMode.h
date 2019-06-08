#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

#import "UIScreen+RNDarkModeTraitChangeListener.h"

@interface RNDarkMode : RCTEventEmitter <RCTBridgeModule>

- (void)currentStyleChanged:(NSString *)style;

@end
