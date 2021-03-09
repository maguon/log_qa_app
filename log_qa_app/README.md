# log_qa_app
# the project for logistic quality  assurance app


## intall
   npm install

   react-native link

## start


## react-native run-android

1.react-native-image-crop-picker -->android-->build.gradle-->android{
  //在这个路径加上一下代码
   dexOptions {
        jumboMode true
    } 
}
//sdk 版本保持一致
def DEFAULT_COMPILE_SDK_VERSION   = 29
def DEFAULT_BUILD_TOOLS_VERSION   = "29.0.2"
def DEFAULT_TARGET_SDK_VERSION    = 29
def DEFAULT_MIN_SDK_VERSION       = 16

2.Manifest merger failed : uses-sdk:minSdkVersion 16 cannot be smaller than version 19 declared in library
 解决办法：  在AndroidMainifest.xml中加入下面加上：
build.gradle  minSdkVersion 19改成 16

3. /Users/rbyu/Documents/react-native-project/log_qa_app/log_qa_app/node_modules/react-native-image-crop-picker/android/build/intermediates/library_manifest/debug/AndroidManifest.xml:10:5-14:15: AAPT: error: unexpected element <queries> found in <manifest>.

 解决办法：查询后发现需要升级gradle版本以能够识别新的<queries>查询元素。
 https://www.jianshu.com/p/c4a15259475c

buildscript {
  ...
    dependencies {
        classpath("com.android.tools.build:gradle:3.5.4")//升级到补丁版本
    }
}


4.react-native0.63.2 安卓release包无法连接网络
解决办法：https://blog.csdn.net/weixin_37178391/article/details/114382181