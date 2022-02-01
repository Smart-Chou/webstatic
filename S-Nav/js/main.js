/*
 * ALL RIGHTS RESERVED.
 *
 * 作者：酷安@_小K同學
 * 项目开始日期：2020年01月26日
 * 上次修改时间：2020年03月24日
 * 开发日志：https://kksan.top/posts/12023
 *
 * 开源相关：
 * Github：https://github.com/Jackie1123/aNavigation
 * 版权所有，请勿删除！
 */

$(document).ready(function () {
    //菜单点击
    $('#menu1').click(function (event) {
        $(this).toggleClass('on');
        $('.list').toggleClass('closed');
    });
    $('#main').click(function (event) {
        $('.on').removeClass('on');
        $('.list').addClass('closed');
    });
});

//关键词sug
$(function () {
    //当键盘键被松开时发送Ajax获取数据
    $('.wd').keyup(function () {
        var keywords = $(this).val();
        if (keywords == '') {
            $('#word').hide();
            return;
        }
        $.ajax({
            url: 'https://suggestion.baidu.com/su?wd=' + keywords,
            dataType: 'jsonp',
            jsonp: 'cb', //回调函数的参数名(键值)key
            // jsonpCallback: 'fun', //回调函数名(值) value
            beforeSend: function () {
                // $('#word').append('<li>正在加载。。。</li>');
            },
            success: function (data) {
                $('#word').empty().show();
                if (data.s == '') {
                    //$('#word').append('<div class="error">Not find  "' + keywords + '"</div>');
                    $('#word').hide();
                }
                $.each(data.s, function () {
                    $('#word').append('<li><svg class="icon" style=" width: 15px; height: 15px; opacity: 0.5;" aria-hidden="true"><use xlink:href="#icon-sousuo"></use></svg> ' + this + '</li>');
                });
            },
            error: function () {
                $('#word').empty().show();
                //$('#word').append('<div class="click_work">Fail "' + keywords + '"</div>');
                $('#word').hide();
            },
        });
    });
    //点击搜索数据复制给搜索框
    $(document).on('click', '#word li', function () {
        var word = $(this).text();
        $('.wd').val(word);
        $('#word').hide();
        $('form').submit();
        // $('#texe').trigger('click');触发搜索事件
    });
});

var storage = window.localStorage;
var data = storage.data;
var night = storage.night;
var bg = storage.bg;
var closealert = storage.closealert;
var li = $('.sidenav-btn');
var blockquote = $('.blockquote');

if (storage.data != undefined) {
    data = data.split(',');
    // console.log('已存在localStorage的数据：' + data); //已存在localStorage的数据
    $('#state a img').attr('src', data[0]); //头图
    $('.submitButton').css('background-color', data[1]); //按钮bgc
    $('#inputText').attr('placeholder', data[2]);
    $('#form').attr('action', data[3]);
    $('#inputText').attr('name', data[4]);
    $('#Select').css('color', data[1]);
    $('.span').css('background-color', data[1]);
}

if (storage.night != undefined) {
    night = night.split(',');
    console.log(night);
    $('#main').css('background-color', night[0]); //主界面
    $('#menu').css('background-color', night[1]); //侧栏
    document.getElementById('night').innerHTML = night[2];
    li.css('background-color', night[3]);
    li.css('color', night[4]);
    blockquote.css('color', night[5]);
}

if (storage.bg != undefined) {
    bg = bg.split(',');
    $('#main').css('background-image', bg[0]);
}

if (storage.closealert != undefined) {
    closealert = closealert.split(',');
    if (closealert[0] == '4.1.1') {
        $('#alert').remove();
    }
}

// rgb to hex
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
// rgb to hex结束

// 添加书签
$(function () {
    var bookmark = {
        data: [
            {
                name: '酷安',
                link: 'https://www.coolapk.com',
                box_shadow: '#11B063',
                icon: '/images/ico/coolapk.png',
            },
            {
                name: 'Via插件',
                link: 'http://via-app.cn',
                box_shadow: '#FA7199',
                icon: '/images/ico/via.png',
            },
            {
                name: '今日热榜',
                link: 'https://tophub.today/',
                box_shadow: '#F2584A',
                icon: '/images/ico/headline.png',
            },
            {
                name: '虎扑',
                link: 'https://www.hupu.com/',
                box_shadow: '#c01d2f',
                icon: '/images/ico/hupu.png',
            },
            {
                name: '少数派',
                link: 'https://sspai.com/',
                box_shadow: '#D7191A',
                icon: '/images/ico/sspai.png',
            },
            {
                name: '小众软件',
                link: 'https://www.appinn.com/',
                box_shadow: '#3279ea',
                icon: '/images/ico/xiaozhong.png',
            },
            {
                name: '疫情跟踪',
                link: 'https://ncov.dxy.cn/ncovh5/view/pneumonia',
                box_shadow: '#7C5DC7',
                icon: '/images/ico/ding.png',
            },
            {
                name: '疫情辟谣',
                link: 'https://vp.fact.qq.com/home',
                box_shadow: '#00A0E9',
                icon: '/images/ico/true.png',
            },
        ],
    };
    for (var i = 0; i < bookmark.data.length; i++) {
        if (bookmark.data[i].name == 'Via插件') {
            var addList = '<li class="folder-item col-xs-3 col-sm-2 visible-xs visible-sm"><a target="_blank" href="' + bookmark.data[i].link + '"><div class="folder-item-box"><img class="folder-item-img" style="box-shadow:' + bookmark.data[i].box_shadow + ' 0 14px 12px -6px" src="' + bookmark.data[i].icon + '" /><p>' + bookmark.data[i].name + '</p></div></a></li>';
        } else {
            var addList = '<li class="folder-item col-xs-3 col-sm-2"><a target="_blank" href="' + bookmark.data[i].link + '"><div class="folder-item-box"><img class="folder-item-img" style="box-shadow:' + bookmark.data[i].box_shadow + ' 0 14px 12px -8px" src="' + bookmark.data[i].icon + '" /><p>' + bookmark.data[i].name + '</p></div></a></li>';
        }
        $('#folder ul').append(addList);
    }
});
// 添加书签结束

// 搜索相关
$(function () {
    var search = {
        data: [
            {
                name: 'google',
                icon: '/images/ico/google-xs.png',
                searchlink: 'https://www.google.com/search',
                searchname: 'q',
                color: '#4285f4',
                placeholder: '咕噜咕噜...',
            },
            {
                name: 'baidu',
                icon: '/images/ico/baidu-xs.png',
                searchlink: 'https://www.baidu.com/s',
                searchname: 'wd',
                color: '#3245df',
                placeholder: '百度一下...',
            },
            {
                name: 'bing',
                icon: '/images/ico/bing-xs.png',
                searchlink: 'https://cn.bing.com/search',
                searchname: 'q',
                color: '#00868B',
                placeholder: 'Bing搜索...',
            },
            {
                name: 'magi',
                icon: '/images/ico/magi-xs.png',
                searchlink: 'https://magi.com/search',
                searchname: 'q',
                color: 'black',
                placeholder: 'Mag[i]...',
            },
            {
                name: 'miji',
                icon: '/images/ico/miji-xs.png',
                searchlink: 'https://mijisou.com/',
                searchname: 'q',
                color: '#575757',
                placeholder: '不追踪你的搜索引擎...',
            },
            {
                name: 'sougou',
                icon: '/images/ico/sougou-xs.png',
                searchlink: 'https://www.sogou.com/web',
                searchname: 'query',
                color: '#f94c18',
                placeholder: '搜狗搜索...',
            },
            {
                name: 'duckduckgo',
                icon: '/images/ico/duckduckgo-xs.png',
                searchlink: 'https://duckduckgo.com',
                searchname: 'q',
                color: '#de5833',
                placeholder: '嘎嘎嘎...',
            },
            {
                name: 'wechat',
                icon: '/images/ico/wechat-xs.png',
                searchlink: 'https://weixin.sogou.com/weixin',
                searchname: 'query',
                color: '#2ca43a',
                placeholder: '搜微信文章...',
            },
            {
                name: 'bilibili',
                icon: '/images/ico/bilibili-xs.png',
                searchlink: 'https://search.bilibili.com/all',
                searchname: 'keyword',
                color: '#e47494',
                placeholder: 'b站是一个学习网站...',
            },
            {
                name: 'github',
                icon: '/images/ico/github-xs.png',
                searchlink: 'https://github.com/search',
                searchname: 'q',
                color: '#24292e',
                placeholder: '全球最大的开源社区...',
            },
            {
                name: 'toutiao',
                icon: '/images/ico/toutiao-xs.png',
                searchlink: 'https://so.toutiao.com/search',
                searchname: 'keyword',
                color: '#ed2f28',
                placeholder: '搜今日头条...',
            },
            {
                name: 'weibo',
                icon: '/images/ico/weibo-xs.png',
                searchlink: 'https://s.weibo.com/weibo',
                searchname: 'q',
                color: '#e6162d',
                placeholder: '搜微博...',
            },
        ],
    };
    for (var i = 0; i < search.data.length; i++) {
        //添加搜索按钮
        var addList = '<li class="folder-item2 col-xs-3 col-sm-2"> <a href="#"> <div class="folder-item-box2"> <img id="' + search.data[i].name + '" class="folder-item-img2" src="' + search.data[i].icon + '" /> </div> </a> </li> ';
        $('.nav ul').append(addList);
    }

    // 切换搜索引擎
    $(document).click(function (e) {
        var id = e.target.id;
        for (var i = 0; i < search.data.length; i++) {
            if (id == search.data[i].name) {
                document.getElementById('state').innerHTML = "<a href='folder://'><img style='width:300px;' src='/images/ico/" + search.data[i].name + ".png'></a>";
                $('#submitButton').css('background-color', search.data[i].color); //按钮bg
                $('#Select').css('color', search.data[i].color); //选择器
                $('#nav').css('display', 'none');
                $('#folder').css('display', 'block');
                document.getElementById('Select').innerHTML = "<hr>搜索引擎 <img src='/images/ico/search-change.svg?v=2ae7ab8'>";
                $('#inputText').attr('placeholder', search.data[i].placeholder);
                $('#form').attr('action', search.data[i].searchlink);
                $('#inputText').attr('name', search.data[i].searchname);

                //存入用户数据
                var searchPho = $('#state a img').attr('src'); //搜索引擎头图
                var color = rgb2hex($('.submitButton').css('background-color')); //搜索按钮颜色和搜索框四边颜色
                var searchL = $('#form').attr('action'); //searchlink
                var searchN = $('#inputText').attr('name'); //searchname
                var placeholder = $('#inputText').attr('placeholder');
                storage.data = [searchPho, color, placeholder, searchL, searchN]; //记录用户数据
                // console.log('新存入localStorage的数据：' + storage.data); //新存入localStorage的数据
                break;
            }
        }
    });
    // 搜索相关结束
});

//检查搜索框是否为空
function check() {
    var o = document.getElementById('inputText');
    var v = o.value;
    v = v.replace(/[ ]/g, '');
    if (v == '') {
        return false;
    }
}
//检查搜索框是否为空结束

//title问候语
var d = new Date();
var time = d.getHours();
if (time < 24) {
    document.getElementById('title').innerHTML = '一个导航 | Good evening';
}
if (time < 18) {
    document.getElementById('title').innerHTML = '一个导航 | Good afternoon';
}
if (time < 12) {
    document.getElementById('title').innerHTML = '一个导航 | Good morning';
}
if (time < 5) {
    document.getElementById('title').innerHTML = '一个导航 | Stay up late again';
}
//title问候语结束

//导航、引擎选择器
function select() {
    $('#folder').css('display') == 'block' ? ($('#folder').css('display', 'none'), $('#nav').css('display', 'block'), (document.getElementById('Select').innerHTML = "<hr>书签 <img src='/images/ico/search-change.svg?v=2ae7ab8'>")) : ($('#nav').css('display', 'none'), $('#folder').css('display', 'block'), (document.getElementById('Select').innerHTML = "<hr>搜索引擎 <img src='/images/ico/search-change.svg?v=2ae7ab8'>"));
}

// 搜索提示词
class searchHint {
    constructor() {
        this.search = inputText;
        this.list = list;
        this.body = document.body;
        this.init();
    }
    init() {
        this.watchInput();
    }
    watchInput() {
        this.search.onkeyup = () => {
            if (this.search.value.length == 0) {
                this.list.innerHTML = '';
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://www.baidu.com/su?wd=' + this.search.value + '&cb=jsonp.showMsg';
            this.body.appendChild(script);
            this.body.removeChild(script);
        };
    }
    showMsg(msg) {
        var href = $('#form').attr('action');
        var name = $('#inputText').attr('name');
        var v = $('#inputText').val();
        var str = '';
        for (var i = 0; i < msg.s.length; i++) {
            var sk = new Array();
            sk[i] = msg.s[i].replace(/\s*/g, ''); //去掉关键字空格
            str += '<a href=' + href + '?' + name + '=' + sk[i] + '><li><span>' + (i + 1) + '</span>' + msg.s[i] + '</li></a>';
        }
        this.list.innerHTML = str;
        if (str) {
            //有返回才显示#searchlist
            $('#searchlist').css('display', 'block');
        }
        document.onkeydown = function (event) {
            if (event.keyCode == 8 && v.length == 1) {
                $('#searchlist').css('display', 'none');
            }
        };
        $(document).click(function () {
            //点击其他地方隐藏#searchlist
            $('#searchlist').css('display', 'none');
        });
    }
}
const jsonp = new searchHint();
