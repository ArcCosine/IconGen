appname = ENV['app'] || 'app'

#
# build
#

desc 'build css'
task 'build:css' do
  require 'sass'
  src_dir = "_scss"
  dest_dir = "css"
  Dir.glob("#{src_dir}/[^_]*.scss") do |file_path|
    sass_engine = Sass::Engine.new(File.read(file_path), {
      :load_paths => [src_dir],
      :syntax => :scss,
    })

    dest_filename = File.basename(file_path).sub(/\.scss$/, '.css')
    dest_path = File.join(dest_dir, dest_filename)
    open(dest_path, 'w') {|f| f.write sass_engine.render}
    puts "build #{file_path} -> #{dest_path}"
  end
end

#
# watch
#

desc 'start server and watch'
task 'watch' do
  require 'filewatcher'

  ENV['APP_NAME'] = appname
  ENV['NODE_PATH'] = 'lib'

  # scss watch
  scss_input_dir = "_scss"
  scss_output_dir = "css"
  fork { sh "sass --watch #{scss_input_dir}:#{scss_output_dir}" }

  # start server 
  fork { sh "python -m SimpleHTTPServer 8080" }

  Process.waitall
end
