require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name         = "ReactNativeDarkMode"
  s.version      = package['version']
  s.summary      = package['description']

  s.authors      = "react-native-dark-mode"
  s.homepage     = package['homepage']
  s.license      = package['license']
  s.platform     = :ios, "9.0"

  s.module_name  = 'ReactNativeDarkMode'

  s.source       = { :git => "https://github.com/codemotionapps/react-native-dark-mode", :tag => "#{s.version}" }
  s.source_files  = "library/ios/**/*.{h,m}"

  s.dependency 'React'
  s.frameworks = 'UIKit'
end