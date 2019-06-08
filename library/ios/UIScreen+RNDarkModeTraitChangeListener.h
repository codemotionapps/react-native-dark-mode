#import <UIKit/UIKit.h>

#import "RNDarkMode.h"

@class RNDarkMode;

@interface UIScreen (RNDarkModeTraitChangeListener)

+ (NSString *)getCurrentMode;
+ (void)setCurrentManager:(RNDarkMode *)manager;

@end
