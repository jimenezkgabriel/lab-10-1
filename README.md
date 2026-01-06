I guess Lab 1 didn't require reflections.

useEffect was a bit of a challenge. I thought I was being clever using useEffect whenever the counter changed, to then update the history... but it kept calling it twice on page load; calling it once because useEffect as always called once, then it got called again becuase the App main component I guess mounted. I also had a challenge on updating the count history trying to mimic what was on the lab preview where I log the count after it increments/decrements instead of before. I did use the setCount(previousCount => previousCount + stepVal) instead of setCount(count + stepVal) but count was for some reason not updated just yet as I logged the count....
I resorted to having a variable called 'next' and setting that to count + the stepVal and then just inserting setCount(next) which worked but I was miffed that the previous solution didn't quite worked.

The auto save and simulating a debounce I just had to google it