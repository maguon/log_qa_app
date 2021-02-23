# log_qa_app
# the project for logistic quality  assurance app


## intall
   npm install

   react-native link

## start


## react-native run-android

1.
npm install  时报node-pre-gyp ERR! Tried to download(403)
 解决：1.remove package-lock.json
            2.remove node_modules
            3.npm install

2.          
update node_modules/react-native-camera/android/build.gradle
（1）buildscript {
  repositories {
    jcenter()
     maven { url 'https://maven.aliyun.com/repository/google' }

  }

（2）repositories {
  mavenCentral()
   maven { url 'https://maven.aliyun.com/repository/google' }
   maven { url 'https://maven.aliyun.com/repository/jcenter' }
}

（3）android/build.gradle
  maven { url 'https://maven.aliyun.com/repository/google' }
  

3.react-native-sound        compile 'com.facebook.react:react-native:+'
解决：
dependencies {
  compile 'com.facebook.react:react-native:0.48.3'
}

4.BarcodeSeannerPackage.java：20
解决：
    // @Override
    // public List<Class<? extends JavaScriptModule>> createJSModules() {
    //     return Collections.emptyList();
    // }

5.* What went wrong:
Execution failed for task ':react-native-camera:processReleaseResources'.
> com.android.ide.common.process.ProcessException: Failed to execute aapt

解决：   targetSdkVersion 与 compileSdkVersion 统 