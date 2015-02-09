# Vagrant Settings
VAGRANTFILE_API_VERSION = "2"

# CoreOS Settings
$coreos_channel = "alpha"

# VirtualBox Settings
$vm_cpus = 1
$vm_memory = 2048

# Networking Settings
$network_ip = "192.168.10.100"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "coreos-%s" % $coreos_channel
  config.vm.box_version = ">= 308.0.1"
  config.vm.box_url = "http://%s.release.core-os.net/amd64-usr/current/coreos_production_vagrant.json" % $coreos_channel

  config.vm.provider "virtualbox" do |vb|
    vb.cpus = $vm_cpus
    vb.memory = $vm_memory
  end

  config.vm.network "forwarded_port", guest: 2375, host: 2375
  config.vm.network "private_network", ip: $network_ip

  config.vm.provision :file, :source => "cloud-config.yaml", :destination => "/tmp/vagrantfile-user-data"
  config.vm.provision :shell, :inline => "mv /tmp/vagrantfile-user-data /var/lib/coreos-vagrant/", :privileged => true

  config.vm.provision :docker do |d|
    d.images = ['progrium/consul']

    d.run 'progrium/consul',
      :cmd => "-server -bootstrap",
      :args => "-p 8400:8400 -p 8500:8500 -p 8600:53/udp"
  end
end
