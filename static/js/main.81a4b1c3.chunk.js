(this.webpackJsonpvoltorbflipjs=this.webpackJsonpvoltorbflipjs||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/voltorb_marker.99f58e1e.svg"},function(e,t,a){e.exports=a.p+"static/media/voltorb.636f6788.svg"},,,,,,,function(e,t,a){e.exports=a(52)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,,,,,,,function(e,t){},,,,,,,,,function(e,t){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n,r,i,c=a(0),l=a.n(c),o=a(15),s=a.n(o),u=(a(22),a(7)),d=a(4),m=a(5);!function(e){e[e.Voltorb=0]="Voltorb",e[e.One=1]="One",e[e.Two=2]="Two",e[e.Three=3]="Three"}(n||(n={})),function(e){e[e.Hidden=0]="Hidden",e[e.Flipped=1]="Flipped"}(r||(r={})),function(e){e[e.Voltorb=0]="Voltorb",e[e.One=1]="One",e[e.Two=2]="Two",e[e.Three=3]="Three"}(i||(i={}));var p=function(){function e(t){Object(d.a)(this,e),this.type=void 0,this.state=r.Hidden,this.markers=[],this.type=t}return Object(m.a)(e,[{key:"flip",value:function(){this.state=r.Flipped}},{key:"mark",value:function(e){this.markers.includes(e)?this.markers.splice(this.markers.indexOf(e),1):this.markers.push(e)}},{key:"isFlipped",value:function(){return this.state===r.Flipped}},{key:"isMultiplier",value:function(){return this.type>=i.Two}}]),e}(),f=a(9),h=a.n(f),v=a(10),b=a.n(v),k=(a(23),function(e){var t=e.marker;return l.a.createElement("div",{className:"boardSpaceMarker marker_".concat(t.toString())},E(t))}),E=function(e){switch(e){case i.Voltorb:return l.a.createElement("img",{src:h.a,alt:"Voltorb marker"});default:return l.a.createElement("span",null,e)}},g=function(e){switch(e.type){case n.Voltorb:return l.a.createElement("div",{className:"spaceVoltorb"},l.a.createElement("span",null,l.a.createElement("img",{src:b.a,alt:"Voltorb space"})));default:return l.a.createElement("div",{className:"spaceMultiplier"},l.a.createElement("span",null,e.type))}},y=function(e){var t=e.space,a=e.handleSpaceClick;return l.a.createElement("div",{className:"space boardSpace ".concat(t.state===r.Hidden?"hidden":"flipped")},l.a.createElement("div",{className:"spaceBorder"},l.a.createElement("div",{className:"spaceInner"},l.a.createElement("div",{className:"spaceFront",onClick:function(e){return a(t)}},l.a.createElement("div",{className:"markers"},t.markers.map((function(e){return l.a.createElement(k,{marker:e})})))),l.a.createElement("div",{className:"spaceBack"},t.state===r.Flipped&&g(t)))))};a(24);var S=function(e){var t=e.spaces;return l.a.createElement("div",{className:"space spacesSummary"},l.a.createElement("div",{className:"spaceBorder"},l.a.createElement("div",{className:"spaceInner spaceSummaryInner"},l.a.createElement("div",{className:"spacesSummaryMultiplierTotal"},function(e){return e.reduce((function(e,t){return t.type!==n.Voltorb?e+t.type:e}),0)}(t)),l.a.createElement("div",{className:"spacesSummaryVoltorbTotal"},l.a.createElement("img",{src:b.a,alt:"Voltorb"}),l.a.createElement("span",null,function(e){return e.reduce((function(e,t){return t.type===n.Voltorb?e+1:e}),0)}(t))))))},N=(a(25),function(e){var t=e.spaces,a=e.handleSpaceClick,n=e.rowIndex;return l.a.createElement("div",{className:"boardRow"},t.map((function(e,t){return l.a.createElement(y,{key:"space_".concat(n,"_").concat(t),space:e,handleSpaceClick:a})})),l.a.createElement(S,{spaces:t}))});a(26);function O(e,t){return t.map((function(t){return t[e]}))}var M,w=function(e){var t=e.board,a=e.handleSpaceClick,n=t.spaces;return l.a.createElement("div",{className:"board"},n.map((function(e,t){return l.a.createElement(N,{key:"boardrow_".concat(t),spaces:e,handleSpaceClick:a,rowIndex:t})})),l.a.createElement("div",{className:"bottomSummary"},n.map((function(e,t){return l.a.createElement(S,{key:"board_column_summary_".concat(t),spaces:O(t,n)})}))))},C=a(13),R=a.n(C),V=a(12),I=a(16);!function(e){e[e.Active=0]="Active",e[e.Lost=1]="Lost",e[e.Complete=2]="Complete"}(M||(M={}));var P,T=function(){function e(t){var a=this;Object(d.a)(this,e),this.difficulty=void 0,this.spaces=void 0,this.width=5,this.height=5,this.numberOfMultipliers=function(){return a.difficulty+2},this.numberOfVoltorbs=function(){return a.difficulty>=5?10:a.difficulty+5},this.totalNumberOfSpaces=function(){return a.width*a.height},this.numberOfOneSpaces=function(){return a.totalNumberOfSpaces()-(a.numberOfMultipliers()+a.numberOfVoltorbs())},this.difficulty=t,this.spaces=[]}return Object(m.a)(e,[{key:"buildSpaces",value:function(e){this.spaces=this.generateSpaces(e)}},{key:"generateSpaces",value:function(e){for(var t=[],a=this.seededElements(e),n=0;n<this.height;n++){t.push([]);for(var r=0;r<this.width;r++)t[n][r]=a[n*this.width+r]}return t}},{key:"seededElements",value:function(e){var t=[].concat(Object(V.a)(this.buildMultipliers(e)),Object(V.a)(this.buildVoltorbs()),Object(V.a)(this.buildOneSpaces()));return t=I.shuffle(t,e().toString(36).substring(2))}},{key:"buildMultipliers",value:function(e){return Array(this.numberOfMultipliers()).fill(0).map((function(){return e()<.6?new p(n.Two):new p(n.Three)}))}},{key:"buildVoltorbs",value:function(){return Array(this.numberOfVoltorbs()).fill(0).map((function(){return new p(n.Voltorb)}))}},{key:"buildOneSpaces",value:function(){return Array(this.numberOfOneSpaces()).fill(0).map((function(){return new p(n.One)}))}},{key:"allSpaces",value:function(){return this.spaces.flat()}},{key:"allMultiplierSpaces",value:function(){return this.allSpaces().filter((function(e){return e.isMultiplier()}))}},{key:"flippedSpaces",value:function(){return this.allSpaces().filter((function(e){return e.isFlipped()}))}},{key:"flippedMultiplierSpaces",value:function(){return this.flippedSpaces().filter((function(e){return e.isMultiplier()}))}},{key:"getCurrentRoundPoints",value:function(){return this.flippedMultiplierSpaces().reduce((function(e,t){return e*t.type}),1)}},{key:"checkBoard",value:function(){return this.isBoardLost()?M.Lost:this.isBoardComplete()?M.Complete:M.Active}},{key:"isBoardLost",value:function(){return void 0!==this.flippedSpaces().find((function(e){return e.type===n.Voltorb}))}},{key:"isBoardComplete",value:function(){return this.flippedMultiplierSpaces().filter((function(e){return e.state===r.Flipped})).length===this.allMultiplierSpaces().length}}]),e}();!function(e){e[e.Playing=0]="Playing",e[e.RoundLost=1]="RoundLost",e[e.Intermission=2]="Intermission"}(P||(P={}));var j,F=function(){function e(){Object(d.a)(this,e),this.board=void 0,this.seed=this.randomSeed(),this.random=void 0,this.currentRoundPoints=0,this.totalPoints=0,this.state=P.Playing,this.flippedMultipliersCount=0,this.random=R()(this.seed),this.board=new T(1),this.board.buildSpaces(this.random)}return Object(m.a)(e,[{key:"updateBoardState",value:function(){switch(this.currentRoundPoints=this.board.getCurrentRoundPoints(),this.flippedMultipliersCount=this.board.flippedMultiplierSpaces().length,this.board.checkBoard()){case M.Active:this.state=P.Playing;break;case M.Complete:this.state=P.Intermission;break;case M.Lost:this.state=P.RoundLost}return this.state}},{key:"startRound",value:function(){this.board.buildSpaces(this.random),this.state=P.Playing}},{key:"nextRound",value:function(){this.state===P.RoundLost?this.handleLostRound():this.handleWonRound(),this.startRound()}},{key:"handleLostRound",value:function(){0===this.flippedMultipliersCount?this.board.difficulty=1:this.flippedMultipliersCount<=this.board.difficulty&&(this.board.difficulty=this.flippedMultipliersCount),this.currentRoundPoints=0}},{key:"handleWonRound",value:function(){this.board.difficulty<8&&(this.board.difficulty+=1)}},{key:"resetGame",value:function(){this.seed=this.randomSeed(),this.random=R()(this.seed),this.board.difficulty=1,this.currentRoundPoints=0,this.totalPoints=0}},{key:"startIntermission",value:function(){this.state=P.Intermission,this.totalPoints+=this.currentRoundPoints,this.currentRoundPoints=0}},{key:"randomSeed",value:function(){return Math.random().toString(36).substring(2)}}]),e}(),x=(a(45),function(e){var t=e.children,a=e.type,n=e.className,r=e.handleOnClick;return l.a.createElement("button",{className:"btn btn-".concat(a," ").concat(n),onClick:r},t)}),B=(a(46),function(e){var t=e.children,a=e.show,n=e.className,r=void 0===n?"":n;return l.a.createElement("div",{className:"overlay ".concat(r," ").concat(a?"show":"")},l.a.createElement("div",{className:"overlayInner"},t))}),L=function(e){var t=e.handleNextRoundClick;return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null,"Round complete!"),l.a.createElement(x,{handleOnClick:t,type:"primary"},"Next round"))},_=function(e){var t=e.handleNextRoundClick,a=e.handleRestartClick;return l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null,"Oh no a Voltorb!"),l.a.createElement("div",{className:"btnGroup"},l.a.createElement(x,{handleOnClick:a,type:"default"},"Restart"),l.a.createElement(x,{handleOnClick:t,type:"primary"},"Next round")))},A=function(e){var t=e.showOverlay,a=e.gameState,n=e.handleNextRoundClick,r=e.handleRestartClick;switch(a){case P.Intermission:return l.a.createElement(B,{show:t},l.a.createElement(L,{handleNextRoundClick:n}));case P.RoundLost:return l.a.createElement(B,{show:t,className:"intermission"},l.a.createElement(_,{handleNextRoundClick:n,handleRestartClick:r}));default:return null}},H=a(11),G=a.n(H),W=(a(47),function(e){var t=e.totalScore,a=e.currentRoundScore,n=e.highScore,r=function(e){return Math.round(e)};return l.a.createElement("div",{className:"gameScore"},l.a.createElement("div",{className:"gameScoreBorder current"},l.a.createElement("div",{className:"gameScoreInner"},l.a.createElement("div",{className:"name"},"Round points"),l.a.createElement("div",{className:"score"},l.a.createElement(G.a,{value:a,formatValue:r})))),l.a.createElement("div",{className:"gameScoreBorder total"},l.a.createElement("div",{className:"gameScoreInner"},l.a.createElement("div",{className:"name"},"Total points"),l.a.createElement("div",{className:"score"},l.a.createElement(G.a,{value:t,formatValue:r})))),l.a.createElement("div",{className:"gameScoreBorder highScore"},l.a.createElement("div",{className:"gameScoreInner"},l.a.createElement("div",{className:"name"},"High score"),l.a.createElement("div",{className:"score"},l.a.createElement(G.a,{value:n,formatValue:r})))))}),J=(a(48),function(e){var t=e.difficulty;return l.a.createElement("div",{className:"gameDifficulty"},l.a.createElement("h1",null,"VOLTORB Flip Lvl. ",t))}),z=(a(49),function(e){var t=e.currentInputMode,a=e.handleInputModeChange;return l.a.createElement("div",{className:"gameInputMode"},l.a.createElement("div",{className:"markers"},l.a.createElement("div",{className:"marker voltorb ".concat(t===j.MarkingVoltorb?"selected":""),onClick:function(){return a(j.MarkingVoltorb)}},l.a.createElement("img",{src:h.a,alt:"Voltorb marker"})),l.a.createElement("div",{className:"marker text one ".concat(t===j.MarkingOne?"selected":""),onClick:function(){return a(j.MarkingOne)}},l.a.createElement("span",null,"1")),l.a.createElement("div",{className:"marker text two ".concat(t===j.MarkingTwo?"selected":""),onClick:function(){return a(j.MarkingTwo)}},l.a.createElement("span",null,"2")),l.a.createElement("div",{className:"marker text three ".concat(t===j.MarkingThree?"selected":""),onClick:function(){return a(j.MarkingThree)}},l.a.createElement("span",null,"3"))),l.a.createElement("div",{className:"flip ".concat(t===j.Flipping?"selected":""),onClick:function(){return a(j.Flipping)}},l.a.createElement("span",null,"Flip")))}),D=(a(50),function(e){var t=e.difficulty,a=e.totalPoints,n=e.currentPoints,r=e.highScore,i=e.handleInputModeChange,c=e.currentInputMode,o=e.handleRestartClick;return l.a.createElement("div",{className:"sidebar"},l.a.createElement("div",{className:"gameMenu"},l.a.createElement("div",{className:"details"},l.a.createElement(J,{difficulty:t}),l.a.createElement(W,{totalScore:a,currentRoundScore:n,highScore:r})),l.a.createElement("div",{className:"inputs"},l.a.createElement(z,{handleInputModeChange:i,currentInputMode:c}),l.a.createElement("div",{className:"controls"},l.a.createElement(x,{handleOnClick:o,type:"secondary"},"Start new game")))),l.a.createElement("footer",null,"Created by ",l.a.createElement("a",{href:"https://twitter.com/icemaz",target:"_blank",rel:"noopener noreferrer"},"@icemaz")," - ",l.a.createElement("a",{href:"https://github.com/EdwardJFox/voltorb-flip",target:"_blank",rel:"noopener noreferrer"},"GitHub")))});a(51);!function(e){e[e.MarkingVoltorb=0]="MarkingVoltorb",e[e.MarkingOne=1]="MarkingOne",e[e.MarkingTwo=2]="MarkingTwo",e[e.MarkingThree=3]="MarkingThree",e[e.Flipping=4]="Flipping"}(j||(j={}));var $=window.localStorage,q=function(){var e=Object(c.useState)(new F),t=Object(u.a)(e,2),a=t[0],n=t[1],i=Object(c.useState)(!1),o=Object(u.a)(i,2),s=o[0],d=o[1],m=Object(c.useState)(j.Flipping),p=Object(u.a)(m,2),f=p[0],h=p[1],v=Object(c.useState)(parseInt($.getItem("voltorbFlipHiScore")||"0")),b=Object(u.a)(v,2),k=b[0],E=b[1],g=function(e){e.mark(f.valueOf()),n(Object.create(a))},y=function(e){var t;e.state===r.Hidden&&a.state===P.Playing&&(e.flip(),a.updateBoardState(),console.log(a.state),a.state!==P.Playing&&(a.totalPoints>k&&(t=a.totalPoints,$.setItem("voltorbFlipHiScore",t.toString()),E(a.totalPoints)),setTimeout((function(){a.board.allSpaces().forEach((function(e){return e.flip()})),n(Object.create(a))}),500),setTimeout((function(){d(!0)}),2e3)),n(Object.create(a)))},S=function(){a.resetGame(),a.startRound(),n(Object.create(a)),d(!1)};return l.a.createElement("div",{className:"voltorbFlip"},a.board&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"boardArea"},l.a.createElement(w,{board:a.board,handleSpaceClick:function(e){f===j.Flipping?y(e):g(e)}}),l.a.createElement(A,{gameState:a.state,handleRestartClick:S,handleNextRoundClick:function(){a.nextRound(),n(Object.create(a)),d(!1)},showOverlay:s})),l.a.createElement(D,{difficulty:a.board.difficulty,totalPoints:a.totalPoints,currentPoints:a.currentRoundPoints,highScore:k,handleInputModeChange:function(e){h(e)},currentInputMode:f,handleRestartClick:S})))};var K=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(q,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(K,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[17,1,2]]]);
//# sourceMappingURL=main.81a4b1c3.chunk.js.map