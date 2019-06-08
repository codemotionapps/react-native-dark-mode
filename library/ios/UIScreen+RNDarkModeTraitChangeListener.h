#import <UIKit/UIKit.h>

#import "RNDarkMode.h"

typedef NS_ENUM(NSInteger, RNDarkModeMode) {
	RNDarkModeModeLight,
	RNDarkModeModeDark,
};

@class RNDarkMode;

@interface UIScreen (RNDarkModeTraitChangeListener)

+ (NSString *)getCurrentMode;
+ (void)setCurrentManager:(RNDarkMode *)manager;

@end
