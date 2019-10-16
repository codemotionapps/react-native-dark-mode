package com.facebook.react;

import android.content.res.Configuration;

import androidx.appcompat.app.AppCompatActivity;

import com.codemotionapps.reactnativedarkmode.DarkModeModule;
import com.facebook.react.bridge.ReactApplicationContext;

public abstract class ReactActivity extends AppCompatActivity {
	@Override
	public void onConfigurationChanged(Configuration newConfig) {
		super.onConfigurationChanged(newConfig);

		ReactApplicationContext context = (ReactApplicationContext) this.getApplicationContext();
		DarkModeModule.notifyForChange(context, newConfig);
	}
}
