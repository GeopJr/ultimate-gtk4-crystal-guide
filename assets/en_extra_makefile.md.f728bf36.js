import{_ as s,c as a,o as n,a as l}from"./app.4beb082a.js";const F=JSON.parse('{"title":"Makefile","description":"","frontmatter":{},"headers":[],"relativePath":"en/extra/makefile.md","lastUpdated":1657016119000}'),p={name:"en/extra/makefile.md"},o=l(`<h1 id="makefile" tabindex="-1">Makefile <a class="header-anchor" href="#makefile" aria-hidden="true">#</a></h1><p>As you might have noticed already, compiling the app requires a series of preparations, flags and env vars. To ease this process, we can use a Makefile!</p><div class="language-makefile"><span class="copy"></span><pre><code><span class="line"><span style="color:#82AAFF;">.PHONY</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> all install uninstall test build mo desktop metainfo</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Variables for easy customization based on environment</span></span>
<span class="line"><span style="color:#A6ACCD;">PREFIX </span><span style="color:#89DDFF;">?=</span><span style="color:#A6ACCD;"> /usr</span></span>
<span class="line"><span style="color:#A6ACCD;">PO_LOCATION </span><span style="color:#89DDFF;">?=</span><span style="color:#A6ACCD;"> po </span><span style="color:#676E95;font-style:italic;"># location of .po files</span></span>
<span class="line"><span style="color:#A6ACCD;">LOCALE_LOCATION </span><span style="color:#89DDFF;">?=</span><span style="color:#A6ACCD;"> /share/locale </span><span style="color:#676E95;font-style:italic;"># PREFIX + LOCALE_LOCATION = where the .mo are going to be moved</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">all</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> desktop metainfo bindings build</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Generate bindings on the fly</span></span>
<span class="line"><span style="color:#82AAFF;">bindings</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CRYSTAL_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">shards install</span></span>
<span class="line"><span style="color:#A6ACCD;">	./bin/gi-crystal</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Build command setting MY_APP_LOCALE_LOCATION to the above mentioned path, using a custom CRYSTAL_LOCATION if any and building with parallelism, release and no-debug</span></span>
<span class="line"><span style="color:#82AAFF;">build</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">	MY_APP_LOCALE_LOCATION=&quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)$(</span><span style="color:#A6ACCD;">LOCALE_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">&quot; </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CRYSTAL_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">shards build -Dpreview_mt --release --no-debug</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">test</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">CRYSTAL_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">crystal spec -Dpreview_mt --order random</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Builds the gresource</span></span>
<span class="line"><span style="color:#82AAFF;">gresource</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">	glib-compile-resources --sourcedir data --target data/dev.geopjr.My_app.gresource data/dev.geopjr.My_app.gresource.xml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Builds the .mo files based on the LINGUAS listings and installs them at $(PREFIX)$(LOCALE_LOCATION)/</span></span>
<span class="line"><span style="color:#82AAFF;">mo</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">	mkdir -p </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PO_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/mo</span></span>
<span class="line"><span style="color:#A6ACCD;">	for lang in \`cat &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PO_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/LINGUAS&quot;\`; do \\</span></span>
<span class="line"><span style="color:#A6ACCD;">		if [[ &quot;$$lang&quot; == &#39;en&#39; || &quot;$$lang&quot; == &#39;&#39; ]]; then continue; fi; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">		mkdir -p &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)$(</span><span style="color:#A6ACCD;">LOCALE_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/$$lang/LC_MESSAGES&quot;; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">		msgfmt &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PO_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/$$lang.po&quot; -o &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PO_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/mo/$$lang.mo&quot;; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">		install -D -m 0644 &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PO_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/mo/$$lang.mo&quot; &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)$(</span><span style="color:#A6ACCD;">LOCALE_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/$$lang/LC_MESSAGES/dev.geopjr.My_app.mo&quot;; \\</span></span>
<span class="line"><span style="color:#A6ACCD;">	done</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Translates .metainfo.xml</span></span>
<span class="line"><span style="color:#82AAFF;">metainfo</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">	msgfmt --xml --template data/dev.geopjr.My_app.metainfo.xml.in -d &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PO_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">&quot; -o data/dev.geopjr.My_app.metainfo.xml</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Translates .desktop</span></span>
<span class="line"><span style="color:#82AAFF;">desktop</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">	msgfmt --desktop --template data/dev.geopjr.My_app.desktop.in -d &quot;</span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PO_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">&quot; -o data/dev.geopjr.My_app.desktop</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Installs the binary, .desktop and icons</span></span>
<span class="line"><span style="color:#82AAFF;">install</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> mo</span></span>
<span class="line"><span style="color:#A6ACCD;">	install -D -m 0755 bin/my_app </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/bin/my_app</span></span>
<span class="line"><span style="color:#A6ACCD;">	install -D -m 0644 data/dev.geopjr.My_app.desktop </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/share/applications/dev.geopjr.My_app.desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">	install -D -m 0644 data/icons/dev.geopjr.My_app.svg </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/share/icons/hicolor/scalable/apps/dev.geopjr.My_app.svg</span></span>
<span class="line"><span style="color:#A6ACCD;">	install -D -m 0644 data/icons/dev.geopjr.My_app-symbolic.svg </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/share/icons/hicolor/symbolic/apps/dev.geopjr.My_app-symbolic.svg</span></span>
<span class="line"><span style="color:#A6ACCD;">	gtk-update-icon-cache /usr/share/icons/hicolor</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Uninstalls the binary, .desktop and icons</span></span>
<span class="line"><span style="color:#82AAFF;">uninstall</span><span style="color:#89DDFF;">:</span></span>
<span class="line"><span style="color:#A6ACCD;">	rm -f </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/bin/my_app</span></span>
<span class="line"><span style="color:#A6ACCD;">	rm -f </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/share/applications/dev.geopjr.My_app.desktop</span></span>
<span class="line"><span style="color:#A6ACCD;">	rm -f </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/share/icons/hicolor/scalable/apps/dev.geopjr.My_app.svg</span></span>
<span class="line"><span style="color:#A6ACCD;">	rm -f </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/share/icons/hicolor/symbolic/apps/dev.geopjr.My_app-symbolic.svg</span></span>
<span class="line"><span style="color:#A6ACCD;">	rm -rf </span><span style="color:#89DDFF;">$(</span><span style="color:#A6ACCD;">PREFIX</span><span style="color:#89DDFF;">)$(</span><span style="color:#A6ACCD;">LOCALE_LOCATION</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">/*/*/dev.geopjr.My_app.mo</span></span>
<span class="line"><span style="color:#A6ACCD;">	gtk-update-icon-cache /usr/share/icons/hicolor</span></span>
<span class="line"></span></code></pre></div><ul><li>You can run specific script eg.:</li></ul><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;">$ make gresource</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li>You can install and uninstall with root:</li></ul><div class="language-"><span class="copy"></span><pre><code><span class="line"><span style="color:#A6ACCD;"># make install</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div>`,7),e=[o];function t(c,r,A,i,D,y){return n(),a("div",null,e)}var d=s(p,[["render",t]]);export{F as __pageData,d as default};
