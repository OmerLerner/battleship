(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{28:function(e,t,a){},29:function(e,t,a){},39:function(e,t,a){"use strict";a.r(t);var i=a(0),n=a(2),s=a.n(n),r=a(18),o=a.n(r),c=(a(28),a(10)),l=(a(29),a(3)),h=a(4),u=a(5),d=a(7),p=a(6),m=a(11),b=a.n(m),v=[{name:"Carrier",length:5},{name:"Battleship",length:4},{name:"Destroyer",length:3},{name:"Submarine",length:3},{name:"Patrol Boat",length:2}],f=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(l.a)(this,a);for(var i=arguments.length,n=new Array(i),s=0;s<i;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).handleClick=function(){e.props.toggle()},e}return Object(h.a)(a,[{key:"render",value:function(){return Object(i.jsx)("div",{className:"modal",children:Object(i.jsxs)("div",{className:"modal_content",children:[Object(i.jsx)("span",{className:"close",onClick:this.handleClick,children:"\xd7    "}),Object(i.jsx)("span",{className:"modalTitle",children:"Battleship Rules"}),Object(i.jsxs)("div",{className:"gameRules",children:["Place all of your ships on the board, then input your name and press 'Start Game'.",Object(i.jsx)("br",{}),Object(i.jsx)("br",{}),"You begin your turn by clicking a tile on the enemy board (labeled 'Enemy Waters'). If you hit an enemy ship, you will see a bomb and the tile will turn grey. If you miss, you will see a X. After your shot registers, your opponent will choose a tile and simulate his turn in the same manner.",Object(i.jsx)("br",{}),Object(i.jsx)("br",{}),"Whenever you hit all of the tiles of an enemy ship, the game will display that you sunk an enemy ship.",Object(i.jsx)("br",{}),Object(i.jsx)("br",{}),"The first player to sink all of their opponent's ships wins the game."]})]})})}}]),a}(n.Component),j=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).togglePop=function(){n.setState({seen:!n.state.seen})},n.changeAxis=function(){"x"===n.state.axis?n.setState({axis:"y"}):n.setState({axis:"x"})},n.createBoard=function(){for(var e=[],t=0;t<64;t++)e.push(t);return n.occupyTiles(e)},n.occupyTiles=function(e){return e.map((function(e){return n.state.occupiedTiles.includes(e)?Object(i.jsx)("div",{className:"tile selectedTile",number:e,id:e}):Object(i.jsx)("div",{className:"tile",onMouseOver:n.handleHover,onMouseLeave:n.handleLeave,onClick:n.handleClick,number:e,id:e})}))},n.checkForCollision=function(e,t,a){if("x"===e){for(var i=1;i<a;i++)if(n.state.occupiedTiles.includes(parseInt(t)+i))return!0;return!1}for(var s=1;s<a;s++)if(n.state.occupiedTiles.includes(parseInt(t)+8*s))return!0;return!1},n.validShipPosition=function(e,t,a){if(n.checkForCollision(a,t,n.state.currentShipLength)||n.checkInvalidShipLocation(a,t))return e.target.classList.toggle("invalidTile"),void n.setState({allowClick:!1});n.handleShipTileSpan(a)},n.handleClick=function(){n.state.allowClick&&(void 0===n.state.shipsToPlace[n.state.currentShipIndex+1]?n.setState((function(e){var t=e.playerData.concat({shipName:e.currentShipName,shipLocation:e.shipTileSpan}),a=e.currentShipIndex+1;return{playerData:t,occupiedTiles:e.occupiedTiles.concat(e.shipTileSpan),currentTile:-1,currentShipIndex:a}})):n.setState((function(e){var t=e.playerData.concat({shipName:e.currentShipName,shipLocation:e.shipTileSpan}),a=e.currentShipIndex+1;return{playerData:t,currentShipIndex:a,occupiedTiles:e.occupiedTiles.concat(e.shipTileSpan),currentShipName:e.shipsToPlace[a].name,currentShipLength:e.shipsToPlace[a].length,currentTile:-1,shipTileSpan:[]}})))},n.handleShipTileSpan=function(e){var t=[];if("x"===e){for(var a=0;a<n.state.shipsToPlace[n.state.currentShipIndex].length;a++)t.push(Number(n.state.currentTile)+a);t.forEach((function(e){return document.getElementById(e).classList.toggle("validTile")})),n.setState({shipTileSpan:t,allowClick:!0})}else{for(var i=0;i<n.state.shipsToPlace[n.state.currentShipIndex].length;i++)t.push(Number(n.state.currentTile)+8*i);t.forEach((function(e){return document.getElementById(e).classList.toggle("validTile")})),n.setState({shipTileSpan:t,allowClick:!0})}},n.state={playerData:[],playerName:"",shipsToPlace:v,currentShipIndex:0,currentShipName:v[0].name,currentShipLength:v[0].length,gameReady:!1,axis:"x",allowClick:!1,currentTile:-1,shipTileSpan:[],occupiedTiles:[],seen:!1},n.handleHover=n.handleHover.bind(Object(u.a)(n)),n.handleLeave=n.handleLeave.bind(Object(u.a)(n)),n.handleClick=n.handleClick.bind(Object(u.a)(n)),n.handlePlayerNameChange=n.handlePlayerNameChange.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"handlePlayerNameChange",value:function(e){this.setState({playerName:e.target.value})}},{key:"checkInvalidShipLocation",value:function(e,t){return"x"===e?t%8+this.state.shipsToPlace[this.state.currentShipIndex].length>8:parseInt(t/8)+this.state.shipsToPlace[this.state.currentShipIndex].length>8}},{key:"handleHover",value:function(e){var t=this;this.setState({currentTile:e.target.attributes.number.value},(function(){return t.validShipPosition(e,e.target.attributes.number.value,t.state.axis)}))}},{key:"handleLeave",value:function(){var e=this;this.setState({},(function(){return e.resetBoardBackgroundColor(e.state.currentTile)}))}},{key:"resetBoardBackgroundColor",value:function(e){this.state.shipTileSpan.length>0?(this.state.shipTileSpan.forEach((function(e){var t=document.getElementById(e);t.classList.contains("validTile")&&t.classList.toggle("validTile"),t.classList.contains("invalidTile")&&t.classList.toggle("invalidTile")})),this.setState({shipTileSpan:[]})):document.getElementById(e).classList.toggle("invalidTile")}},{key:"render",value:function(){return void 0===this.state.shipsToPlace[this.state.currentShipIndex]?Object(i.jsxs)("form",{className:"enterPlayerName flip-in-hor-top",onSubmit:this.props.handleGameStart.bind(this,!0,this.state.playerData,this.state.playerName),children:[Object(i.jsx)("label",{className:"enterPlayerNameSpan",children:"Enter your name"}),Object(i.jsx)("input",{type:"text",className:"playerNameInput",value:this.state.playerName,onChange:this.handlePlayerNameChange}),Object(i.jsx)("input",{type:"submit",className:"submitButton",value:"Start Game"})]}):Object(i.jsxs)("div",{className:"displayContainer",children:[Object(i.jsx)("span",{className:"title",children:"BATTLESHIP"}),Object(i.jsxs)("div",{className:"displayContent",children:[Object(i.jsxs)("span",{className:"displayText",children:["Captain, place your ",this.state.shipsToPlace[this.state.currentShipIndex].name,"."]}),Object(i.jsx)("br",{}),Object(i.jsx)("button",{className:"axisToggle",onClick:this.togglePop,children:"Rules"}),Object(i.jsxs)("button",{className:"axisToggle",onClick:this.changeAxis,children:["Axis : ",this.state.axis]}),this.state.seen?Object(i.jsx)(f,{toggle:this.togglePop}):null]}),Object(i.jsx)("div",{className:"playerShipSetup",children:Object(i.jsx)(b.a,{className:"playerGrid",width:60,gap:1,children:this.createBoard()})})]})}}]),a}(s.a.Component),g=a(17),S=a.n(g),x=a(21),y=a(8),O=a(9),k=a(22);var T=function(e,t,a,i,n){var s,r=function(){var e,t=n.gameboard.ships,a=Object(k.a)(t);try{for(a.s();!(e=a.n()).done;){var i=e.value;if(i.hits.length>0&&!i.isSunk()){var s=function(){for(var e=i.hits[i.hits.length-1],t=i.position.findIndex((function(t){return t===e})),a=1;t+a<i.position.length||t-a>-1;){if(t+a<i.position.length){var n=t+a;if(!i.hits.includes(i.position[n]))return{v:o(e,i.position[n])}}if(t-a>-1){var s=t-a;if(!i.hits.includes(i.position[s]))return{v:o(e,i.position[s])}}a++}}();if("object"===typeof s)return s.v}}}catch(r){a.e(r)}finally{a.f()}return u()},o=function(e,t){return e<t?t-e<8?{index:t,direction:"right"}:{index:t,direction:"down"}:e-t<8?{index:t,direction:"left"}:{index:t,direction:"up"}},c=function(e){for(var t,a=l(),i=0;i<30;i++){if(null!==(t=h(e,a)))return{index:t.index,direction:a};a=l()}return u()},l=function(){var e="";switch(Math.floor(4*Math.random())){case 0:e="left";break;case 1:e="up";break;case 2:e="right";break;case 3:e="down";break;default:e="Generate random direction failed"}return e},h=function(e,t){var a=n.gameboard.board;return"left"===t&&(e-1)%8!==7&&e-1>-1&&!a[e-1].isShot?{index:e-1,direction:"left"}:"right"===t&&(e+1)%8!==0&&e+1<64&&!a[e+1].isShot?{index:e+1,direction:"right"}:"up"===t&&e-8>=0&&e-8>-1&&!a[e-8].isShot?{index:e-8,direction:"up"}:"down"===t&&e+8<=63&&e+8<64&&!a[e+8].isShot?{index:e+8,direction:"down"}:null},u=function(){var e=n.gameboard.board.filter((function(e){return!e.isShot}));return{index:e[Math.floor(Math.random()*e.length)].index,direction:""}};s=t&&!a?function(e){if(""!==i){var t=h(e,i);return null!==t?t:r()}return c(e)}(e):-1!==function(){for(var e=n.gameboard.ships,t=0;t<e.length;t++)if(e[t].hits.length>0&&!e[t].isSunk())return t;return-1}()?r():u(),n.gameboard.recieveShot(s.index);var d=n.gameboard.checkForHit(s.index);if(-1!==d){var p=n.gameboard.ships[d].name;return n.gameboard.checkIfSunk(d)?n.gameboard.checkIfAllShipsSunk()?{gameOver:!0,gameOverMessage:"Your opponent has won the game!",index:s.index,lastShotHit:!0,lastShotSunkShip:!0,direction:s.direction,displayText:"Your opponent sunk your "+p+"!"}:{index:s.index,lastShotHit:!0,lastShotSunkShip:!0,direction:s.direction,displayText:"Your opponent sunk your "+p+"!"}:{index:s.index,lastShotHit:!0,lastShotSunkShip:!1,direction:s.direction,displayText:"Your opponent hit your ship!"}}return{index:s.index,lastShotHit:!1,lastShotSunkShip:!1,direction:s.direction,displayText:"Your opponent missed your ship!"}},C=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(l.a)(this,a);for(var i=arguments.length,n=new Array(i),s=0;s<i;s++)n[s]=arguments[s];return(e=t.call.apply(t,[this].concat(n))).handleClick=function(){e.props.toggle()},e}return Object(h.a)(a,[{key:"render",value:function(){return this.props.computerWon?Object(i.jsx)("div",{className:"gameOverModal",children:Object(i.jsxs)("div",{className:"gameOverContent",children:[Object(i.jsx)("span",{className:"modalTitle",children:this.props.message}),Object(i.jsx)("button",{className:"newGameButton",onClick:function(){return window.location.reload(!1)},children:"Play Again"})]})}):Object(i.jsx)("div",{className:"gameOverModal",children:Object(i.jsxs)("div",{className:"gameOverContent playerWinnerModal",children:[Object(i.jsx)("span",{className:"modalWinnerTitle",children:this.props.message}),Object(i.jsx)("button",{className:"newGameButton",onClick:function(){return window.location.reload(!1)},children:"Play Again"})]})})}}]),a}(n.Component),N=function(e){Object(d.a)(a,e);var t=Object(p.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).createBoard=function(e){for(var t=[],a=0;a<64;a++)t.push(a);return"human"===e?n.occupyHumanTiles(t):n.occupyComputerTiles(t)},n.occupyComputerTiles=function(e){return e.map((function(e){return n.props.cpuPlayer.gameboard.board[e].isShot?n.props.cpuPlayer.gameboard.board[e].hasShip?Object(i.jsx)("div",{className:"gameboardTile hasShip isShot",number:e,id:e,children:Object(i.jsx)(y.a,{icon:O.a})}):Object(i.jsx)("div",{className:"gameboardTile hasMissed",number:e,id:e,children:Object(i.jsx)(y.a,{icon:O.b})}):Object(i.jsx)("div",{className:"gameboardTile",onMouseOver:n.handleHover,onMouseLeave:n.handleLeave,onClick:n.handleClick,number:e,id:e})}))},n.occupyHumanTiles=function(e){return e.map((function(e){return n.props.humanPlayer.gameboard.board[e].hasShip?n.props.humanPlayer.gameboard.board[e].isShot?Object(i.jsx)("div",{className:"gameboardTile hasShip isShot humanBoard",number:e,id:e,children:Object(i.jsx)(y.a,{icon:O.a})}):Object(i.jsx)("div",{className:"gameboardTile hasShip humanBoard",number:e,id:e}):n.props.humanPlayer.gameboard.board[e].isShot?Object(i.jsx)("div",{className:"gameboardTile hasMissed humanBoard",number:e,id:e,children:Object(i.jsx)(y.a,{icon:O.b})}):Object(i.jsx)("div",{className:"gameboardTile humanBoard",number:e,id:e})}))},n.timer=function(e){return new Promise((function(t){return setTimeout(t,e)}))},n.state={activeTurn:!1,gameOver:!1,computerWon:!1,gameOverMessage:"",currentTile:-1,displayText:"Awaiting your move...",lastComputerShotHit:!1,lastComputerShotSunkShip:!1,computerHitDirection:"",lastComputerShotIndex:-1},n.handleHover=n.handleHover.bind(Object(u.a)(n)),n.handleLeave=n.handleLeave.bind(Object(u.a)(n)),n.handleClick=n.handleClick.bind(Object(u.a)(n)),n}return Object(h.a)(a,[{key:"handleHover",value:function(e){this.state.activeTurn||e.target.classList.contains("hoverEnemyBoard")||(e.target.classList.toggle("hoverEnemyBoard"),this.setState({currentTile:e.target.attributes.number.value}))}},{key:"handleLeave",value:function(e){this.state.activeTurn||e.target.classList.contains("hoverEnemyBoard")&&e.target.classList.toggle("hoverEnemyBoard")}},{key:"handleClick",value:function(e){this.state.activeTurn||this.simulateGameRound(parseInt(e.target.attributes.number.value))}},{key:"simulateGameRound",value:function(){var e=Object(x.a)(S.a.mark((function e(t){var a,i;return S.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({activeTurn:!0}),a=this.props.cpuPlayer.gameboard,this.handlePlayerTurn(t,a),e.next=5,this.timer(1e3);case 5:if(!this.state.gameOver){e.next=7;break}return e.abrupt("return");case 7:return this.setState({displayText:"Your opponent is thinking..."}),e.next=10,this.timer(1250);case 10:if(!(i=T(this.state.lastComputerShotIndex,this.state.lastComputerShotHit,this.state.lastComputerShotSunkShip,this.state.computerHitDirection,this.props.humanPlayer)).gameOver){e.next=15;break}this.setState({lastComputerShotIndex:i.index,lastComputerShotHit:i.lastShotHit,lastComputerShotSunkShip:i.lastShotSunkShip,computerHitDirection:i.direction,displayText:i.displayText,gameOver:!0,gameOverMessage:i.gameOverMessage,computerWon:!0}),e.next=19;break;case 15:return this.setState({lastComputerShotIndex:i.index,lastComputerShotHit:i.lastShotHit,lastComputerShotSunkShip:i.lastShotSunkShip,computerHitDirection:i.direction,displayText:i.displayText}),e.next=18,this.timer(1500);case 18:this.setState({displayText:"Awaiting your move...",activeTurn:!1});case 19:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handlePlayerTurn",value:function(e,t){t.board[e].isShot=!0;var a=t.checkForHit(e);if(-1!==a){var i=t.ships[a].name;return t.checkIfSunk(a)?t.checkIfAllShipsSunk()?(this.setState({gameOver:!0,gameOverMessage:"Game Over! You beat the opponent!",displayText:"You sunk your opponent's "+i+"!"}),!0):(this.setState({displayText:"You sunk your opponent's "+i+"!"}),!0):(this.setState({displayText:"You shot and hit an enemy ship!"}),!0)}return this.setState({displayText:"You shot and missed!"}),!1}},{key:"render",value:function(){return Object(i.jsxs)("div",{className:"gameContainer fade-in",children:[Object(i.jsxs)("div",{className:"gameHeader",children:[Object(i.jsx)("span",{className:"title",children:"BATTLESHIP"}),Object(i.jsx)("br",{}),Object(i.jsx)("span",{className:"displayText",children:this.state.displayText})]}),this.state.gameOver?Object(i.jsx)(C,{message:this.state.gameOverMessage,computerWon:this.state.computerWon}):null,Object(i.jsxs)("div",{className:"gameboardsContainer",children:[Object(i.jsxs)("div",{className:"playerBoard",children:[Object(i.jsx)("span",{className:"boardHeader",children:this.props.humanPlayer.name}),Object(i.jsx)(b.a,{width:60,height:60,gap:1,children:this.createBoard("human")})]}),Object(i.jsxs)("div",{className:"computerBoard",children:[Object(i.jsx)("span",{className:"boardHeader",children:"Enemy Waters"}),Object(i.jsx)(b.a,{width:60,height:60,gap:1,children:this.createBoard("cpu")})]})]})]})}}]),a}(s.a.Component),P=function(){function e(t){Object(l.a)(this,e),this.board=t||[],this.board.length||this.init(),this.ships=[],this.missedShots=[]}return Object(h.a)(e,[{key:"init",value:function(){for(var e=0;e<64;e++)this.board[e]={hasShip:!1,isShot:!1,index:e}}},{key:"placeShip",value:function(e){var t=this;e.position.forEach((function(e){t.board[e].hasShip=!0})),this.ships.push(e)}},{key:"recieveShot",value:function(e){this.board[e].isShot=!0}},{key:"checkForHit",value:function(e){if(!this.board[e].isShot||!this.board[e].hasShip)return this.missedShots.push(e),-1;for(var t=0;t<this.ships.length;t++)if(this.ships[t].position.includes(e))return console.log("We got a hit boys!"),this.ships[t].hit(e),t}},{key:"checkIfSunk",value:function(e){return!!this.ships[e].isSunk()&&(this.ships.splice(e,1),!0)}},{key:"checkIfAllShipsSunk",value:function(){return 0===this.ships.length||void 0===this.ships}}]),e}(),L=function(){function e(t,a){Object(l.a)(this,e),this.name=t,this.position=a,this.hits=[]}return Object(h.a)(e,[{key:"hit",value:function(e){this.position.includes(e)&&this.hits.push(e)}},{key:"isSunk",value:function(){var e=this;return this.position.every((function(t){return e.hits.includes(t)}))}}]),e}(),B=function(){function e(t,a){Object(l.a)(this,e),this.name=t,this.gameboard=new P,"CPU"===t?this.initCPUBoard():this.initPlayerBoard(a)}return Object(h.a)(e,[{key:"fireShot",value:function(e,t){t.receiveShot(e)}},{key:"initPlayerBoard",value:function(e){var t=this;e.forEach((function(e){var a=new L(e.shipName,e.shipLocation);t.gameboard.placeShip(a)}))}},{key:"initCPUBoard",value:function(){var e=this.generateRandomShipLocations(v);this.initPlayerBoard(e)}},{key:"generateRandomShipLocations",value:function(e){var t=this,a=[];return e.forEach((function(e){for(var i=t.chooseAxis(),n=t.generateCoordinate(i,e.length);!t.checkForCollision(n,i,e.length,a);)n=t.generateCoordinate(i,e.length);a.push({shipName:e.name,shipLocation:t.generateShipLocation(i,n,e.length)})})),a}},{key:"chooseAxis",value:function(){return 0===Math.floor(2*Math.random())?"x":"y"}},{key:"generateCoordinate",value:function(e,t){for(var a=Math.floor(Math.random()*Math.floor(64));!this.isValidShipLocation(a,e,t);)a=Math.floor(Math.random()*Math.floor(64));return a}},{key:"isValidShipLocation",value:function(e,t,a){return"x"===t?e%8+a<=8:parseInt(e/8)+a<=8}},{key:"checkForCollision",value:function(e,t,a,i){if(0===i.length)return!0;var n=[],s=[];i.forEach((function(e){return s=s.concat(e.shipLocation)})),n="x"===t?this.generateShipLocation("x",e,a):this.generateShipLocation("y",e,a);for(var r=0;r<a;r++)if(s.includes(n[r]))return!1;return!0}},{key:"generateShipLocation",value:function(e,t,a){var i=[];if("x"===e)for(var n=0;n<a;n++)i.push(t+n);else for(var s=0;s<a;s++)i.push(t+8*s);return i}}]),e}();var w=function(){var e=Object(n.useState)(!0),t=Object(c.a)(e,2),a=t[0],s=t[1];return Object(i.jsxs)("div",{className:"audioButton",children:[Object(i.jsx)("audio",{src:"https://docs.google.com/uc?export=download&id=19EeVeupWVUwPUyP7iK3OM14Iz1YBaJuf"}),Object(i.jsx)("button",{className:"musicButton",onClick:function(){var e=document.querySelector(".musicButton"),t=document.querySelector("audio");console.log(t),t.paused?(t.volume=.1,t.play(),s(!1)):(t.pause(),s(!0)),e.classList.add("fade")},children:a?Object(i.jsx)(y.a,{icon:O.d}):Object(i.jsx)(y.a,{icon:O.c})})]})};var I=function(){var e=Object(n.useState)(!1),t=Object(c.a)(e,2),a=t[0],s=t[1],r=Object(n.useState)({}),o=Object(c.a)(r,2),l=o[0],h=o[1],u=Object(n.useState)({}),d=Object(c.a)(u,2),p=d[0],m=d[1];return Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)(w,{}),a?Object(i.jsx)(N,{humanPlayer:l,cpuPlayer:p}):Object(i.jsx)(j,{handleGameStart:function(e,t,a){return e&&(s(!0),h(new B(""===a?"Bill Nye the Science Guy":a,t)),m(new B("CPU"))),null}})]})};o.a.render(Object(i.jsx)(s.a.StrictMode,{children:Object(i.jsx)(I,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.3de3ae12.chunk.js.map