# sshfsmount
Mount a remote instance locally

###Install
`[sudo] npm install sshfsmount -g`

###Help
```
  -I, --mount string
  -C, --connect string
  -u, --unmount string
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

###Create
`mounter -a -n sitename -H site.com -f site.pem`

###Connect
`mounter -C sitename`

###Mount
`mounter -I sitename`