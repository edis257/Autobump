# Checks if the screen session 'autobump' is running
if ! screen -list | grep -q "autobump"; then
  echo "Bot process is not running. Starting it now."
  cd /home/username/Autobump/
  # Start a new screen session 'autobump' and run autobump.js inside it
  screen -S autobump node autobump.js
fi

# cronjob
#*/10 * * * * /home/username/Autobump/checkrun.sh >> /home/username/Autobump/logfile.log 2>&1