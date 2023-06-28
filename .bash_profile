function lazygit() {
  git add .
  while [ true ] ; do
  read -t 3 -n 1
  if [ $? = 0 ] ; then
  exit ;
  else
  git commit -a -m "$1"
  git push
}