// ------選手一人当たりの出場機会と余り枠を算出---------- //
let num_game = 0;
let gameTime =0;
let num_player = 0;
let slot = 0;
let opp = 0;
let rem = 0;
let num_field = 12;

let playerN = [];
        let CFval;
        let LSHval;
        let OMFval;
        let RSHval;
        let DMFval;
        let LSBval;
        let RSBval;
        let GKval;
        let playerN_set;                         //重複していたら削除する      
        let playerN_set_array;                   //連想配列から配列に戻す


function set(){
    num_game = Number($("#num_game").val());  //試合数
    gameTime = Number($("#gameTime").val());  //試合時間
    num_player = Number($("#num_player").val());  //選手人数
    
    slot = num_game * 8;                                    //出場枠＝試合数*8名
    opp = slot / num_player;                                //出場機会＝出場枠÷人数
    opp_kirisute = Math.floor(opp)                          //出場機会の整数値
    rem = slot - (num_player * opp_kirisute)                //出場枠の余り

    document.getElementById("opp").innerHTML = opp_kirisute + '枠' +'（' + gameTime + '分×' + opp_kirisute + '枠）';
    document.getElementById("rem_slot").innerHTML = rem + '枠';
}


let playerName = [];
let playerName_set = [];
let playerName_set_array = [];

let player = {
    name:['トキ','タイキ','アツキ','マサノリ','リュウ','ヒナタ','ハルト','ケイゴ','ミナタ','マサフミ','ユウト','アマネ','ナオタロウ','ミズキ','ショウ','リクト','ジョージ','ユウマ','メイコウ','オウタ','トモヒコ','ケイ','ヒロヤ','ゴウ','ユウセイ','トウマ','リンタロウ','ガク','ヒロト','カンタ','マヒロ'],
    opp:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}



// ------チェックボックスで選択した選手をセレクトボックスに表示する---------- //
$('#get_players').on('click', function () {

    $('input[name="player"]:checked').each(function(){
        playerName.push( $(this).val() );
    });

    playerName_set = new Set(playerName)  //配列中の重複を回避するSet()メソッド
    playerName_set_array = Array.from(playerName_set)  //Set()メソッドで連想配列になったので配列に戻す

     for(let i=0; i< playerName_set_array.length; i++){
        let option = document.createElement("option");
        option.text = playerName_set_array[i];                                      //セレクトボックスの表示名を追加
        option.value = playerName_set_array[i];                                     //セレクトボックスの表示名を選択した時のValueを追加
        $(".CF, .LSH, .OMF, .RSH, .DMF, .LSB, .RSB, .GK").append(option);           //この書き方だとclassの指定でいける！！！
        // let CF1 = document.getElementById("CF1");
        // CF1.selectedIndex = -1;    
    }
});





//-------出場回数を足し算する--------//
function syutuzyouzikan(i){


    
    document.getElementById("kakuteiBtn"+i).disabled = true;
    document.getElementById("canselBtn"+i).disabled = false;

    $('#CF'+i).disableSelection();          //参考：https://qiita.com/inaling/items/f42d2685b5516d5f5319
    $('#LSH'+i).disableSelection();         //（ボタンを押したら）セレクトボックスを選択不可にする
    $('#OMF'+i).disableSelection();
    $('#RSH'+i).disableSelection();
    $('#DMF'+i).disableSelection();
    $('#LSB'+i).disableSelection();
    $('#RSB'+i).disableSelection();
    $('#GK'+i).disableSelection();



        playerN = [];
        CFval = $('#CF'+i).val();
        LSHval = $('#LSH'+i).val();
        OMFval = $('#OMF'+i).val();
        RSHval = $('#RSH'+i).val();
        DMFval = $('#DMF'+i).val();
        LSBval = $('#LSB'+i).val();
        RSBval = $('#RSB'+i).val();
        GKval = $('#GK'+i).val();
//-------セレクトボックスで選択した選手の名前を取得し、その選手は出場機会(opp)を1増やす--------//
        playerN.push(CFval,LSHval,OMFval,RSHval,DMFval,LSBval,RSBval,GKval);  //配列playerNに文字列を追加
        playerN_set = new Set(playerN)                                    //重複していたら削除する      
        playerN_set_array = Array.from(playerN_set)                       //連想配列から配列に戻す
        playerN.forEach(function(element) {                                   //配列から1つずつvalueを取り出すforEachで出場選手1人ずつ出力
            // console.log(element + ':この試合に出場する選手');
            for(i=0; i<player.name.length; i++){
                if(element == player.name[i]){
                    player.opp[i]++;
                }
            }
        });
                //-------アラート--------//                
                console.log(playerN + '&' + playerN_set_array)
                console.log(playerN.length + '&' + playerN_set_array.length)
                if(playerN.length != playerN_set_array.length){
                    alert('フィールドに同じ選手が2人以上出てますよ')
                }
        // console.log(player)
        return player;  //オブジェクトplayer{}に値を返す。  
};





function cancel(i){
    document.getElementById("kakuteiBtn"+i).disabled = false;
    document.getElementById("canselBtn"+i).disabled = true;
    $('#CF'+i).enableSelection();           //参考：https://qiita.com/inaling/items/f42d2685b5516d5f5319
    $('#LSH'+i).enableSelection();          //（ボタンを押したら）セレクトボックスを選択可能にする
    $('#OMF'+i).enableSelection();
    $('#RSH'+i).enableSelection();
    $('#DMF'+i).enableSelection();
    $('#LSB'+i).enableSelection();
    $('#RSB'+i).enableSelection();
    $('#GK'+i).enableSelection();


    playerN = [];
    CFval = $('#CF'+i).val();
    LSHval = $('#LSH'+i).val();
    OMFval = $('#OMF'+i).val();
    RSHval = $('#RSH'+i).val();
    DMFval = $('#DMF'+i).val();
    LSBval = $('#LSB'+i).val();
    RSBval = $('#RSB'+i).val();
    GKval = $('#GK'+i).val();
//-------セレクトボックスで選択した選手の名前を取得し、その選手は出場機会(opp)を1増やす--------//
    playerN.push(CFval,LSHval,OMFval,RSHval,DMFval,LSBval,RSBval,GKval);  //配列playerNに文字列を追加
    playerN.forEach(function(element) {                                   //配列から1つずつvalueを取り出すforEachで出場選手1人ずつ出力
        for(i=0; i<player.name.length; i++){
            if(element == player.name[i]){
                player.opp[i]--;                                          //オブジェクトの"name"に対応する"opp"を1減らす（選手の出場回数のカウントを１減らす）
                // console.log(player.name[i]+player.opp[i])
            }
        }
    });
    // console.log(player)
};



function syutuzyoukaisuu(){
        
    let table = document.getElementById("content-table");
    let rowLen = table.rows.length;

    if(rowLen===1){
        playerName.forEach(function(element) {                               //配列から1つずつvalueを取り出すforEachで出場選手1人ずつ出力
        for(i=0; i<player.name.length; i++){
            // console.log(player.name[i]+player.opp[i])
            if(element == player.name[i]){                                  //参考：https://gxy-life.com/2PC/PC/PC20211011.html
                let newRow = playerList.insertRow(-1);
                let newCell = newRow.insertCell(0);
                let newCell2 = newRow.insertCell(1);

                let newText = document.createTextNode(player.name[i])
                newCell.appendChild(newText)
                let newVal = document.createTextNode(player.opp[i])
                newCell2.appendChild(newVal)
                }
            }
        });
    }

    if(rowLen!==1){
        for(let i = rowLen; i>1; i--){
        table.deleteRow(i-1);
        }
        playerName.forEach(function(element) {                                   //配列から1つずつvalueを取り出すforEachで出場選手1人ずつ出力
            for(i=0; i<player.name.length; i++){
                // console.log(player.name[i]+player.opp[i])
                if(element == player.name[i]){                                  //参考：https://gxy-life.com/2PC/PC/PC20211011.html
                    let newRow = playerList.insertRow(-1);
                    let newCell = newRow.insertCell(0);
                    let newCell2 = newRow.insertCell(1);

                    let newText = document.createTextNode(player.name[i])
                    newCell.appendChild(newText)
                    let newVal = document.createTextNode(player.opp[i])
                    newCell2.appendChild(newVal)
                    }
                }
            });
    }

}







$('#kakuteiBtn'+1).on('click', function(){
    syutuzyouzikan(1);
    syutuzyoukaisuu();
});
$('#canselBtn'+1).on('click', function(){
    cancel(1);
    syutuzyoukaisuu();
});


$('#kakuteiBtn'+2).on('click', function(){
    syutuzyouzikan(2);
    syutuzyoukaisuu();

});
$('#canselBtn'+2).on('click', function(){
    cancel(2);
    syutuzyoukaisuu();

});



$('#kakuteiBtn'+3).on('click', function(){
    syutuzyouzikan(3);
    syutuzyoukaisuu();

});
$('#canselBtn'+3).on('click', function(){
    cancel(3);
    syutuzyoukaisuu();
    
});



$('#kakuteiBtn'+4).on('click', function(){
    syutuzyouzikan(4);
    syutuzyoukaisuu();

});
$('#canselBtn'+4).on('click', function(){
    cancel(4);
    syutuzyoukaisuu();

});



$('#kakuteiBtn'+5).on('click', function(){
    syutuzyouzikan(5);
    syutuzyoukaisuu();

});
$('#canselBtn'+5).on('click', function(){
    cancel(5);
    syutuzyoukaisuu();

});



$('#kakuteiBtn'+6).on('click', function(){
    syutuzyouzikan(6);
    syutuzyoukaisuu();

});
$('#canselBtn'+6).on('click', function(){
    cancel(6);
    syutuzyoukaisuu();
});



$('#kakuteiBtn'+7).on('click', function(){
    syutuzyoukaisuu(7);
    syutuzyouzikan();
});
$('#canselBtn'+7).on('click', function(){
    cancel(7);
    syutuzyouzikan();
});



$('#kakuteiBtn'+8).on('click', function(){
    syutuzyouzikan(8);
    syutuzyouzikan();
});
$('#canselBtn'+8).on('click', function(){
    cancel(8);
    syutuzyouzikan();
});



$('#kakuteiBtn'+9).on('click', function(){
    syutuzyouzikan(9);
    syutuzyouzikan();
});
$('#canselBtn'+9).on('click', function(){
    cancel(9);
    syutuzyouzikan();
});



$('#kakuteiBtn'+10).on('click', function(){
    syutuzyouzikan(10);
    syutuzyouzikan();
});
$('#canselBtn'+10).on('click', function(){
    cancel(10);
    syutuzyouzikan();
});



$('#kakuteiBtn'+11).on('click', function(){
    syutuzyouzikan(11);
    syutuzyouzikan();
});
$('#canselBtn'+11).on('click', function(){
    cancel(11);
    syutuzyouzikan();
});



$('#kakuteiBtn'+12).on('click', function(){
    syutuzyouzikan(12);
    syutuzyouzikan();
});
$('#canselBtn'+12).on('click', function(){
    cancel(12);
    syutuzyouzikan();
});



// for(i=1; i<num_field+1; i++){
//     let kakuteiBtni = "#kakuteiBtn"+i
//     let canselBtni = "#canselBtn"+i

//     console.log(kakuteiBtni)
//     console.log(canselBtni)


//     $(kakuteiBtni).on('click', function(){
//         syutuzyouzikan(i);
//         syutuzyoukaisuu();
//     });
//     $(canselBtni).on('click', function(){
//         cancel(i);
//         syutuzyoukaisuu();
//     });
    
// }


