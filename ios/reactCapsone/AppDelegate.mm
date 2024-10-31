#import "AppDelegate.h"
#import "RNBootSplash.h"
#import <React/RCTBundleURLProvider.h>
#import <GoogleMaps/GoogleMaps.h> // Google Maps 헤더 추가

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"reactCapsone";
  self.initialProps = @{};

  [GMSServices provideAPIKey:@"AIzaSyCXHz0mvS9eXujvaV7-rTauA1Pli_19sjY"]; // Google Maps API 키 설정
  [super application:application didFinishLaunchingWithOptions:launchOptions];

  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:self.window.rootViewController.view]; // <- initialization using the storyboard file name

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

// ⬇️ Add this before file @end (for react-native 0.74+)
- (void)customizeRootView:(RCTRootView *)rootView {
  [RNBootSplash initWithStoryboard:@"BootSplash" rootView:rootView]; // ⬅️ initialize the splash screen
}

@end
