package com.reactcapsone

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

import android.os.Bundle
import com.zoontek.rnbootsplash.RNBootSplash

class MainActivity : ReactActivity() {
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "reactCapsone"

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this) // ⬅️ initialize the splash screen
    super.onCreate(savedInstanceState) // super.onCreate(null) with react-native-screens
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
   /**  override fun createReactActivityDelegate(): ReactActivityDelegate =
     * DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) 
     */
    override fun createReactActivityDelegate(): ReactActivityDelegate {
      return DefaultReactActivityDelegate(
          this,
          mainComponentName,
          fabricEnabled() // Use a function without 'DefaultNewArchitectureEntryPoint'
    )}

    fun fabricEnabled(): Boolean {
        // Return true or false based on whether Fabric Renderer is enabled in your project
        return false // Set it to false if you're not using the Fabric renderer yet
    }
}