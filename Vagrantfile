Vagrant.configure("2") do |config|
  config.vm.box = "maier/alpine-3.6-x86_64"
  config.vm.network "forwarded_port", guest: 8000, host: 8000
  config.vm.synced_folder "./", "/vagrant"
  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = true

    # Customize the amount of memory on the VM:
    vb.memory = "1024"
  end
  config.vm.provision "shell", inline: <<-SHELL
    apk update
    apk upgrade
    apk add nodejs --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/main/
    apk add yarn --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community/
    yarn global add gatsby-cli
  SHELL
end
