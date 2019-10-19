package com.codemotionapps.reactnativedarkmode;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.res.Configuration;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class DarkModeModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
	private final ReactApplicationContext reactContext;
	private final int initialMode;
	private int lastEmittedMode;

	private class Receiver extends BroadcastReceiver {
		private DarkModeModule module;

		public Receiver(DarkModeModule module) {
			super();
			this.module = module;
		}

		@Override
		public void onReceive(Context context, Intent intent) {
			this.module.notifyForChange();
		}
	}

	public DarkModeModule(final ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;

		initialMode = reactContext.getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK;
		lastEmittedMode = initialMode;

		reactContext.addLifecycleEventListener(this);

		reactContext.registerReceiver(new Receiver(this), new IntentFilter("android.intent.action.CONFIGURATION_CHANGED"));
	}

	private void notifyForChange() {
		if (reactContext.hasActiveCatalystInstance()) {
			Configuration configuration = reactContext.getResources().getConfiguration();
			int currentMode = configuration.uiMode & Configuration.UI_MODE_NIGHT_MASK;
			if (currentMode == lastEmittedMode) return;
			lastEmittedMode = currentMode;
			String mode = currentMode == Configuration.UI_MODE_NIGHT_YES
					? "dark"
					: "light";
			reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
					.emit("currentModeChanged", mode);
		}
	}

	@Override
	public String getName() {
		return "RNDarkMode";
	}

	@Override
	public Map<String, Object> getConstants() {
		final Map<String, Object> constants = new HashMap<>();
		constants.put("initialMode", initialMode == Configuration.UI_MODE_NIGHT_YES ? "dark" : "light");
		constants.put("supportsDarkMode", initialMode != Configuration.UI_MODE_NIGHT_UNDEFINED);
		return constants;
	}

	@Override
	public void onHostResume() {
		this.notifyForChange();
	}

	@Override
	public void onHostPause() {
	}

	@Override
	public void onHostDestroy() {
	}
}
