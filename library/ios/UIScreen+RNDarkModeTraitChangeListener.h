#import <UIKit/UIKit.h>

#import "RNDarkMode.h"

@class RNDarkMode;

@interface UIScreen (RNDarkModeTraitChangeListener)

+ (NSString *)getCurrentStyle;
+ (void)setCurrentManager:(RNDarkMode *)manager;

@end
