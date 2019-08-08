Vagrant.configure("2") do |config|
  config.vm.box = "generic/alpine39"
  config.vm.network "forwarded_port", guest: 8000, host: 8000
  config.vm.network "forwarded_port", guest: 9000, host: 9000
  config.vm.synced_folder "./", "/vagrant"
  config.vm.synced_folder "#{Dir.home}/CPS_content", "/home/vagrant/CPS_content"
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true

    # Customize the amount of memory on the VM:
    vb.memory = "2048"
  end
  config.vm.provision "shell", inline: <<-SHELL
    apk update
    apk upgrade
    apk add -U rsync
    apk add nodejs --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/main/
    apk add yarn --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community/
    yarn global add gatsby-cli
    apk add --no-cache make gcc g++ python # Required to get install from source of gatsby-plugin-sharp working
    apk add vips-dev fftw-dev --update-cache --repository https://dl-3.alpinelinux.org/alpine/edge/community/
    yarn global add node-gyp
  SHELL
end
