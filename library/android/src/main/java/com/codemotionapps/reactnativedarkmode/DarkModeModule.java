package com.codemotionapps.reactnativedarkmode;

import android.app.ActivityManager;
import android.app.ActivityManager.RunningAppProcessInfo;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DarkModeModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
	public static ReactApplicationContext reactContext;

	public DarkModeModule(final ReactApplicationContext reactContext) {
		super(reactContext);
		this.reactContext = reactContext;

		reactContext.addLifecycleEventListener(this);

		if (isAppOnForeground(reactContext)) {
			Intent intent = new Intent(reactContext, DarkModeService.class);
			reactContext.getApplicationContext().startService(intent);
		}
	}

	private boolean isAppOnForeground(Context context) {
		ActivityManager activityManager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
		List<RunningAppProcessInfo> appProcesses = activityManager.getRunningAppProcesses();
		if (appProcesses == null) {
			return false;
		}
		final String packageName = context.getPackageName();
		for (RunningAppProcessInfo appProcess : appProcesses) {
			if (appProcess.importance == RunningAppProcessInfo.IMPORTANCE_FOREGROUND && appProcess.processName.equals(packageName)) {
				return true;
			}
		}
		return false;
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

	@Override
	public void onHostResume() {
		Intent intent = new Intent(reactContext, DarkModeService.class);
		reactContext.getApplicationContext().startService(intent);
	}

	@Override
	public void onHostPause() {
		Intent intent = new Intent(reactContext, DarkModeService.class);
		reactContext.getApplicationContext().stopService(intent);
	}

	@Override
	public void onHostDestroy() {
		Intent intent = new Intent(reactContext, DarkModeService.class);
		reactContext.getApplicationContext().stopService(intent);
	}
}
