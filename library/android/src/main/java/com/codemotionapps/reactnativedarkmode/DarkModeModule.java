package com.codemotionapps.reactnativedarkmode;

import android.content.res.Configuration;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class DarkModeModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
	private ReactApplicationContext reactContext;

	public DarkModeModule(final ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;

		reactContext.addLifecycleEventListener(this);
	}

	@Override
	public String getName() {
		return "RNDarkMode";
	}

	@Override
	public Map<String, Object> getConstants() {
		int currentMode = reactContext.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
		final Map<String, Object> constants = new HashMap<>();
		constants.put("initialMode", currentMode == Configuration.UI_MODE_NIGHT_YES ? "dark" : "light");
		constants.put("supportsDarkMode", currentMode != Configuration.UI_MODE_NIGHT_UNDEFINED);
		return constants;
	}

	public static String getCurrentMode(Configuration configuration) {
		return (configuration.uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES
				? "dark"
				: "light";
	}

	public static void notifyForChange(ReactApplicationContext context, Configuration configuration) {
		if (context.hasActiveCatalystInstance()) {
			context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
					.emit("currentModeChanged", DarkModeModule.getCurrentMode(configuration));
		}
	}

	@Override
	public void onHostResume() {
		DarkModeModule.notifyForChange(reactContext, reactContext.getResources().getConfiguration());
	}

	@Override
	public void onHostPause() {
	}

	@Override
	public void onHostDestroy() {
	}
}
