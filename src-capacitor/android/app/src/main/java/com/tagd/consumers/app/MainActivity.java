package com.tagd.consumers.app;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.analytics.Analytics;
import com.microsoft.appcenter.crashes.Crashes;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
    }});

    // if (BuildConfig.DEBUG) {
    //   EnableHttpsSelfSigned.enable(this.bridge);
    // }

    // App Center
    AppCenter.start(
      getApplication(),
      "e013bfad-aaa8-4a57-8509-7e7d91becac1", //TODO: Do not hardcode
      Analytics.class,
      Crashes.class
    );

  }
}
