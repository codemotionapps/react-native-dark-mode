#import <UIKit/UIKit.h>

#import "RNDarkMode.h"

@interface RNDarkModeTraitChangeListener : UIView

@property NSString *currentStyle;

@property RNDarkMode *module;

- (id)initWithModule:(RNDarkMode *)module;

@end
