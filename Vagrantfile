VAGRANTFILE_API_VERSION = "2"
 
$script = <<SCRIPT

export DEBIAN_FRONTEND=noninteractive

#install docker
apt-get update
apt-get install apt-transport-https ca-certificates
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo 'deb https://apt.dockerproject.org/repo ubuntu-trusty main' | tee /etc/apt/sources.list.d/docker.list
apt-get update
apt-get purge lxc-docker
apt-get install -y --force-yes docker-engine

# Install kernel extras to enable docker aufs support
apt-get -y install linux-image-extra-$(uname -r)

#add the vagrant user to the docker group
usermod -aG docker vagrant
 
#install docker-compose
curl -L https://github.com/docker/compose/releases/download/1.7.1/docker-compose-Linux-x86_64 > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

SCRIPT

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :private_network, ip: "192.168.11.3"
  config.vm.provision "shell", inline: $script
  config.vm.provider "virtualbox" do |vb|
    vb.memory = 2048
  end
end