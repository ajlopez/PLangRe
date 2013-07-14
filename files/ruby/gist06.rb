task :test => "test:javascript"
 
namespace :test do
  task :javascript, :expresso_args do |t, args|
    node = `/usr/bin/env which node`
    if node == ""
      puts "Skipping JavaScript unit tests: no 'node' executable found."
      puts "Please install node.js v0.4.0 or newer."
    else
      puts "Running JavaScript unit tests:"
      expresso = "test/javascript/support/expresso"
      extra_args = args[:expresso_args] || ""
      include_path = "public/javascripts"
      test_scripts = "test/javascript/*.js"
      Dir.chdir(Rails.root) do
        sh "NODE_PATH=#{include_path} #{expresso} #{extra_args} #{test_scripts} 2>&1"
      end
    end
  end
end