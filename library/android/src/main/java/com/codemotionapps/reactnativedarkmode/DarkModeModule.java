package com.codemotionapps.reactnativedarkmode;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.Map;

public class DarkModeModule extends ReactContextBaseJavaModule {
	public static ReactApplicationContext reactContext;
	public static final String CUSTOM_INTENT = "com.codemotionapps.reactnativedarkmode.MODE_CHANGE";

	public class Receiver extends BroadcastReceiver {
		@Override
		public void onReceive(Context context, Intent intent) {
			if (intent.getAction().equals(CUSTOM_INTENT)) {
				System.out.println("GOT THE INTENT");
			}
		}
	}

	public DarkModeModule(final ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;

		Intent intent = new Intent(reactContext, DarkModeService.class);
		reactContext.getApplicationContext().startService(intent);
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
}
