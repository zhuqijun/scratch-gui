export default (filename, blob,  toserver) => {
    const downloadLink = document.createElement('a');
    document.body.appendChild(downloadLink);
    var canSaveToServer = true;
	
    // Use special ms version if available to get it working on Edge.
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
        return;
    }
           
	if(toserver == 1) 
    {
		    //var phpServerURL = "http://" + window.location.hostname;
			var phpServerURL = "http://www.codeway.vip";

			
			if(filename=='Scratch作品.sb3')
			{
			
				alert('请为你的作品指定一个名称'); 
				return;
			}
			const reader = new FileReader();
			reader.addEventListener('loadend',(e)=>{
				const formData = new FormData();
				formData.append("filename",filename);
				formData.append("content",reader.result);
				formData.append("length",reader.result.length);
				//
				//formData.append("file_data", blob);
		        //
			fetch(phpServerURL + "/admin/goods.php?act=scratch",{method:'POST',credentials: 'include', body: formData})
			.then(res=>{
					  if(res.status == 200)
					  {						  
				        res.text().then(txt=> {if(txt == "1") alert('作品 ' + filename + ' 已成功保存到云服务器'); else alert('作品保存失败！'); }    );
						
					  }
					  else if(res.status == 401)
						alert('未登录或会话已超时,请重新登录'); 
			        }
		       );	
			   
			reader.removeEventListener("loadend");				
			});
			reader.readAsDataURL(blob);
		
	}
	else
	{
		const url = window.URL.createObjectURL(blob);
		downloadLink.href = url;
		downloadLink.download = filename;
		downloadLink.click();
		window.URL.revokeObjectURL(url);
		document.body.removeChild(downloadLink);
	}
};
