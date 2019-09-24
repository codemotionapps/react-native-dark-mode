package com.codemotionapps.reactnativedarkmode;

import android.app.Service;
import android.content.Intent;
import android.content.res.Configuration;
import android.os.IBinder;

import com.facebook.react.modules.core.DeviceEventManagerModule;

public class DarkModeService extends Service {
	@Override
	public IBinder onBind(Intent intent) {
		return null;
	}

	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);

		DarkModeModule.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
				.emit("currentModeChanged", DarkModeModule.getCurrentMode(newConfig));
	}
}
