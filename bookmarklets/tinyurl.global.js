javascript:(()=>{location.assign(`https://tinyurl.com/create.php?${new URLSearchParams({url:location.href,alias:`${document.title.toLowerCase().trim().replaceAll(/\s/g,"-").replaceAll(/[^\w-]/g,"").replaceAll(/--+/g,"-").substring(0,15)}-${(Math.random()*1e6).toFixed().padStart(6,"0")}`})}`);})();
