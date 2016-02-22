# node-mounter
Mount a remote instance locally

##Example

###Create
`node mounter -a -n sitename -H site.com -f site.pem`

###Connect
`node mounter -C sitename`

###Mount
`node mounter -I -n sitename`

###Help
```
  -I, --mount
  -C, --connect
  -g, --setGlobal
  -a, --add
  -M, --defaultMountDir string
  -R, --defaultRemoteDir string
  -U, --defaultUsername string
  -P, --defaultPemDir string
  -c, --getGlobalConfig
  -m, --mountDir string
  -n, --mountName string
  -H, --host string
  -p, --pemDir string
  -f, --pemFile string
  -r, --remoteDir string
  -h, --help
 ```