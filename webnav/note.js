document.getElementById('btn_nonte_add').onclick=function(){
    if(!document.getElementById('note_input').value){return}
    var note=localStorage.getItem('wnote')
    note=note?JSON.parse(note):[]
    note.unshift(document.getElementById('note_input').value)
    localStorage.setItem('wnote',JSON.stringify(note))
    renderNote(note)
    document.getElementById('note_input').value=''
}

document.getElementById('wrap_note').onclick=function(ev){
    if(ev.target.className.indexOf('btn_del')!=-1){
        ev.target.parentNode.remove()
        var note=localStorage.getItem('wnote')
        note=JSON.parse(note)
        note.splice(ev.target.dataset.idx,1)
        renderNote(note)
        localStorage.setItem('wnote',JSON.stringify(note))
    }
}

document.getElementById('note_input').onkeyup=function(ev){
    if(ev.keyCode===13){
        document.getElementById('btn_nonte_add').click()
    }
}

document.getElementById('popicon').onclick=function(){
    var owrap_note=document.getElementById('wrap_note')
    if(owrap_note.show){
        owrap_note.style.display='none';
        owrap_note.show=false
    }else{
        owrap_note.style.display='block';
        owrap_note.show=true
        var note=localStorage.getItem('wnote')
        note=note?JSON.parse(note):[]
        renderNote(note)
        document.getElementById('note_input').focus()
    }
    
}

function renderNote(note){
    var cc=''
    note.forEach(function(v,k){
        cc+='<div class="yt yt-pj yt-ac note-item">\
                    <div class="note-cont">'+v+'</div>\
                    <div data-idx="'+k+'" class="btn-del btn_del">✖</div>\
                </div>'   
    })
    document.getElementById('note_list').innerHTML=cc
}