/*
 * Ext JS Library 3.0 RC2
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.layout.MenuLayout=Ext.extend(Ext.layout.ContainerLayout,{renderItem:function(c,position,target){if(!this.itemTpl){this.itemTpl=Ext.layout.MenuLayout.prototype.itemTpl=new Ext.XTemplate('<li id="{itemId}" class="{itemCls}">','<tpl if="needsIcon">','<img src="{icon}" class="{iconCls}">','</tpl>','</li>');}
if(c&&!c.rendered){if(typeof position=='number'){position=target.dom.childNodes[position];}
var a=this.getItemArgs(c);c.render(c.positionEl=position?this.itemTpl.insertBefore(position,a,true):this.itemTpl.append(target,a,true));c.positionEl.menuItemId=c.itemId||c.id;if(!a.isMenuItem&&a.needsIcon){c.positionEl.addClass('x-menu-list-item-indent');}}else if(c&&!this.isValidParent(c,target)){if(typeof position=='number'){position=target.dom.childNodes[position];}
target.dom.insertBefore(c.getActionEl().dom,position||null);}},getItemArgs:function(c){var isMenuItem=c instanceof Ext.menu.Item;return{isMenuItem:isMenuItem,needsIcon:!isMenuItem&&(c.icon||c.iconCls),icon:c.icon||Ext.BLANK_IMAGE_URL,iconCls:'x-menu-item-icon '+(c.iconCls||''),itemId:'x-menu-el-'+c.id,itemCls:'x-menu-list-item '+(this.extraCls||'')};},isValidParent:function(c,target){return c.el.up('li.x-menu-list-item',5).dom.parentNode===(target.dom||target);},onLayout:function(ct,target){this.renderAll(ct,target);this.doAutoSize();},doAutoSize:function(){var ct=this.container,w=ct.width;if(w){ct.setWidth(w);}else if(Ext.isIE){ct.setWidth(Ext.isStrict&&(Ext.isIE7||Ext.isIE8)?'auto':ct.minWidth);var el=ct.getEl(),t=el.dom.offsetWidth;ct.setWidth(ct.getLayoutTarget().getWidth()+el.getFrameWidth('lr'));}}});Ext.Container.LAYOUTS['menu']=Ext.layout.MenuLayout;Ext.menu.Menu=Ext.extend(Ext.Container,{minWidth:120,shadow:"sides",subMenuAlign:"tl-tr?",defaultAlign:"tl-bl?",allowOtherMenus:false,ignoreParentClicks:false,enableScrolling:true,maxHeight:null,scrollIncrement:24,showSeparator:true,floating:true,hidden:true,hideMode:'offsets',layout:'menu',scrollerHeight:8,autoLayout:true,initComponent:function(){if(Ext.isArray(this.initialConfig)){Ext.apply(this,{items:this.initialConfig});}
this.addEvents('beforeshow','beforehide','show','hide','click','mouseover','mouseout','itemclick');Ext.menu.MenuMgr.register(this);Ext.menu.Menu.superclass.initComponent.call(this);if(this.autoLayout){this.on({add:this.doLayout,remove:this.doLayout,scope:this});}},getLayoutTarget:function(){return this.ul;},onRender:function(ct,position){if(!ct){ct=Ext.getBody();}
var dh={id:this.getId(),cls:'x-menu '+((this.floating)?'x-layer ':'')+(this.cls||'')+(this.plain?' x-menu-plain':'')+(this.showSeparator?'':' x-menu-nosep'),style:this.style,cn:[{tag:'a',cls:'x-menu-focus',href:'#',onclick:'return false;',tabIndex:'-1'},{tag:'ul',cls:'x-menu-list'}]};if(this.floating){this.el=new Ext.Layer({shadow:this.shadow,dh:dh,constrain:false,parentEl:ct,zindex:15000});}else{this.el=ct.createChild(dh);}
Ext.menu.Menu.superclass.onRender.call(this,ct,position);if(!this.keyNav){this.keyNav=new Ext.menu.MenuNav(this);}
this.focusEl=this.el.child('a.x-menu-focus');this.ul=this.el.child('ul.x-menu-list');this.mon(this.ul,'click',this.onClick,this);this.mon(this.ul,'mouseover',this.onMouseOver,this);this.mon(this.ul,'mouseout',this.onMouseOut,this);if(this.enableScrolling){this.mon(this.el,'click',this.onScroll,this,{delegate:'.x-menu-scroller'});this.mon(this.el,'mouseover',this.deactivateActive,this,{delegate:'.x-menu-scroller'});}},findTargetItem:function(e){var t=e.getTarget(".x-menu-list-item",this.ul,true);if(t&&t.menuItemId){return this.items.get(t.menuItemId);}},onClick:function(e){var t=this.findTargetItem(e);if(t){if(t.isFormField){this.setActiveItem(t);}else{if(t.menu&&this.ignoreParentClicks){t.expandMenu();e.preventDefault();}else if(t.onClick){t.onClick(e);this.fireEvent("click",this,t,e);}}}},setActiveItem:function(item,autoExpand){if(item!=this.activeItem){this.deactivateActive();if((this.activeItem=item).isFormField){item.focus();}else{item.activate(autoExpand);}}else if(autoExpand){item.expandMenu();}},deactivateActive:function(){var a=this.activeItem;if(a){if(a.isFormField){if(a.collapse){a.collapse();}}else{a.deactivate();}
delete this.activeItem;}},tryActivate:function(start,step){var items=this.items;for(var i=start,len=items.length;i>=0&&i<len;i+=step){var item=items.get(i);if(!item.disabled&&(item.canActivate||item.isFormField)){this.setActiveItem(item,false);return item;}}
return false;},onMouseOver:function(e){var t=this.findTargetItem(e);if(t){if(t.canActivate&&!t.disabled){this.setActiveItem(t,true);}}
this.over=true;this.fireEvent("mouseover",this,e,t);},onMouseOut:function(e){var t=this.findTargetItem(e);if(t){if(t==this.activeItem&&t.shouldDeactivate&&t.shouldDeactivate(e)){this.activeItem.deactivate();delete this.activeItem;}}
this.over=false;this.fireEvent("mouseout",this,e,t);},onScroll:function(e,t){if(e){e.stopEvent();}
var ul=this.ul.dom,top=Ext.fly(t).is('.x-menu-scroller-top');ul.scrollTop+=this.scrollIncrement*(top?-1:1);if(top?ul.scrollTop<=0:ul.scrollTop+this.activeMax>=ul.scrollHeight){this.onScrollerOut(null,t);}},onScrollerIn:function(e,t){var ul=this.ul.dom,top=Ext.fly(t).is('.x-menu-scroller-top');if(top?ul.scrollTop>0:ul.scrollTop+this.activeMax<ul.scrollHeight){Ext.fly(t).addClass(['x-menu-item-active','x-menu-scroller-active']);}},onScrollerOut:function(e,t){Ext.fly(t).removeClass(['x-menu-item-active','x-menu-scroller-active']);},show:function(el,pos,parentMenu){this.parentMenu=parentMenu;if(!this.el){this.render();this.doLayout(false,true);}
this.fireEvent("beforeshow",this);this.showAt(this.el.getAlignToXY(el,pos||this.defaultAlign),parentMenu,false);},showAt:function(xy,parentMenu,_e){this.parentMenu=parentMenu;if(!this.el){this.render();}
if(_e!==false){this.fireEvent("beforeshow",this);xy=this.el.adjustForConstraints(xy);}
this.el.setXY(xy);if(this.enableScrolling){this.constrainScroll(xy[1]);}
this.el.show();Ext.menu.Menu.superclass.onShow.call(this);if(Ext.isIE){this.layout.doAutoSize();}
this.hidden=false;this.focus();this.fireEvent("show",this);},constrainScroll:function(y){var max,full=this.ul.setHeight('auto').getHeight();if(this.maxHeight){max=this.maxHeight-(this.scrollerHeight*3);}else{var ct=Ext.get(this.el.dom.parentNode);max=Ext.fly(this.el.dom.parentNode).getViewSize().height-y-(this.scrollerHeight*3);}
if(full>max&&max>0){this.activeMax=max;this.ul.setHeight(max);this.createScrollers();}else{this.ul.setHeight(full);this.el.select('.x-menu-scroller').setDisplayed('none');}
this.ul.dom.scrollTop=0;},createScrollers:function(){if(!this.scroller){this.scroller={pos:0,top:this.el.insertFirst({tag:'div',cls:'x-menu-scroller x-menu-scroller-top',html:'&#160;'}),bottom:this.el.createChild({tag:'div',cls:'x-menu-scroller x-menu-scroller-bottom',html:'&#160;'})};this.scroller.top.hover(this.onScrollerIn,this.onScrollerOut,this);this.scroller.topRepeater=new Ext.util.ClickRepeater(this.scroller.top,{listeners:{click:this.onScroll.createDelegate(this,[null,this.scroller.top],false)}});this.scroller.bottom.hover(this.onScrollerIn,this.onScrollerOut,this);this.scroller.bottomRepeater=new Ext.util.ClickRepeater(this.scroller.bottom,{listeners:{click:this.onScroll.createDelegate(this,[null,this.scroller.bottom],false)}});}},onLayout:function(){if(this.isVisible()){if(this.enableScrolling){this.constrainScroll(this.el.getTop());}
if(Ext.isIE){this.layout.doAutoSize();}
this.el.sync();}},focus:function(){if(!this.hidden){this.doFocus.defer(50,this);}},doFocus:function(){if(!this.hidden){this.focusEl.focus();}},hide:function(deep){if(this.el){Ext.menu.Menu.superclass.hide.call(this);this.el.hide();if(deep===true&&this.parentMenu){this.parentMenu.hide(true);}}},onHide:function(){Ext.menu.Menu.superclass.onHide.call(this);this.deactivateActive();},lookupComponent:function(c){var item;if(c.render){item=c;}else if(typeof c=="string"){if(c=="separator"||c=="-"){item=new Ext.menu.Separator();}else{item=new Ext.menu.TextItem(c);}}else if(c.tagName||c.el){item=new Ext.BoxComponent({el:c})}else if(typeof c=="object"){Ext.applyIf(c,this.defaults);item=this.getMenuItem(c);}
return item;},addSeparator:function(){return this.add(new Ext.menu.Separator());},addElement:function(el){return this.add(new Ext.menu.BaseItem(el));},addItem:function(item){return this.add(item);},addMenuItem:function(config){return this.add(this.getMenuItem(config));},getMenuItem:function(config){if(!(config.isXType&&config.isXType(Ext.menu.Item))){if(config.xtype){return Ext.ComponentMgr.create(config,this.defaultType);}else if(typeof config.checked=="boolean"){return new Ext.menu.CheckItem(config);}else{return new Ext.menu.Item(config);}}
return config;},addText:function(text){return this.add(new Ext.menu.TextItem(text));},onDestroy:function(){Ext.menu.Menu.superclass.onDestroy.call(this);Ext.menu.MenuMgr.unregister(this);Ext.EventManager.removeResizeListener(this.hide,this);if(this.keyNav){this.keyNav.disable();}
var s=this.scroller;if(s){Ext.destroy(s.topRepeater,s.bottomRepeater,s.top,s.bottom);}}});Ext.reg('menu',Ext.menu.Menu);Ext.menu.MenuNav=Ext.extend(Ext.KeyNav,function(){function up(e,m){if(!m.tryActivate(m.items.indexOf(m.activeItem)-1,-1)){m.tryActivate(m.items.length-1,-1);}}
function down(e,m){if(!m.tryActivate(m.items.indexOf(m.activeItem)+1,1)){m.tryActivate(0,1);}}
return{constructor:function(menu){Ext.menu.MenuNav.superclass.constructor.call(this,menu.el);this.scope=this.menu=menu;},doRelay:function(e,h){var k=e.getKey();if(this.menu.activeItem&&this.menu.activeItem.isFormField&&k!=e.TAB){return false;}
if(!this.menu.activeItem&&e.isNavKeyPress()&&k!=e.SPACE&&k!=e.RETURN){this.menu.tryActivate(0,1);return false;}
return h.call(this.scope||this,e,this.menu);},tab:function(e,m){e.stopEvent();if(e.shiftKey){up(e,m);}else{down(e,m);}},up:up,down:down,right:function(e,m){if(m.activeItem){m.activeItem.expandMenu(true);}},left:function(e,m){m.hide();if(m.parentMenu&&m.parentMenu.activeItem){m.parentMenu.activeItem.activate();}},enter:function(e,m){if(m.activeItem){e.stopPropagation();m.activeItem.onClick(e);m.fireEvent("click",this,m.activeItem);return true;}}};}());