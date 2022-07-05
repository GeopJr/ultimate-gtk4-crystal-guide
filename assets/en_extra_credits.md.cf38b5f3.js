import{_ as s,c as n,o as a,a as l}from"./app.4beb082a.js";const i=JSON.parse('{"title":"Credits","description":"","frontmatter":{},"headers":[],"relativePath":"en/extra/credits.md","lastUpdated":1657016119000}'),p={name:"en/extra/credits.md"},o=l(`<h1 id="credits" tabindex="-1">Credits <a class="header-anchor" href="#credits" aria-hidden="true">#</a></h1><p>It&#39;s nice (and sometimes required) to give credits to the libraries you used and the people who spent time translating your app.</p><p><a href="https://github.com/elorest/compiled_license" target="_blank" rel="noopener noreferrer">compiled_license</a> bundles the licenses of all the shards you install that can then be accessed by running <code>./my_app --licenses</code>.</p><p>For thanking translators, I&#39;ve written a tiny script that you can use in a macro:</p><div class="language-crystal"><span class="copy"></span><pre><code><span class="line"><span style="color:#676E95;font-style:italic;"># thank_translators.cr</span></span>
<span class="line"></span>
<span class="line"><span style="color:#676E95;font-style:italic;"># Prints all translators (thanks!).</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">TRANSLATION_DIR_NAME</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">po</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">translations_dir </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Dir</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">open</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">TRANSLATION_DIR_NAME</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">translations </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> translations_dir</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">children</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">reject! </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> x </span><span style="color:#89DDFF;">==</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">!</span><span style="color:#A6ACCD;">x</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">ends_with?</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">.po</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">thanks </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Hash</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Array</span><span style="color:#89DDFF;">(</span><span style="color:#FFCB6B;">String</span><span style="color:#89DDFF;">)).</span><span style="color:#A6ACCD;">new</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">regex </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lang</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">        </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">/</span><span style="color:#A6ACCD;">\\n\\&quot;</span><span style="color:#C3E88D;">Language</span><span style="color:#A6ACCD;">\\:</span><span style="color:#C3E88D;"> ?</span><span style="color:#89DDFF;">(</span><span style="color:#C3E88D;">.+</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;">\\\\</span><span style="color:#C3E88D;">n</span><span style="color:#A6ACCD;">\\&quot;\\n</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">translators</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">/</span><span style="color:#C3E88D;"># ?</span><span style="color:#89DDFF;">(</span><span style="color:#C3E88D;">.+</span><span style="color:#89DDFF;">)</span><span style="color:#C3E88D;"> </span><span style="color:#A6ACCD;">\\&lt;</span><span style="color:#C3E88D;">.+</span><span style="color:#A6ACCD;">\\&gt;</span><span style="color:#C3E88D;">, </span><span style="color:#89DDFF;">[</span><span style="color:#C3E88D;">0-9</span><span style="color:#89DDFF;">]{</span><span style="color:#C3E88D;">4</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;">.?</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">/</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">translations</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">each </span><span style="color:#89DDFF;font-style:italic;">do </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">translation</span><span style="color:#89DDFF;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">  translation_path </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Path</span><span style="color:#89DDFF;">[</span><span style="color:#FFCB6B;">TRANSLATION_DIR_NAME</span><span style="color:#89DDFF;">].</span><span style="color:#82AAFF;">join</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">translation</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">next</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">unless</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">File</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">file?</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">translation_path</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">  translation_content </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">File</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">read</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">translation_path</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  lang </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> translation_content</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">scan</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">regex</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">lang</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">])[</span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">?</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">try </span><span style="color:#89DDFF;">&amp;.[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">?</span></span>
<span class="line"><span style="color:#A6ACCD;">  translators </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> translation_content</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">scan</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">regex</span><span style="color:#89DDFF;">[</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">translators</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">])</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">  translators</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">each </span><span style="color:#89DDFF;font-style:italic;">do </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">t_md</span><span style="color:#89DDFF;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">    t_name </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> t_md</span><span style="color:#89DDFF;">[</span><span style="color:#F78C6C;">1</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;">?</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;font-style:italic;">next</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">if</span><span style="color:#A6ACCD;"> t_name</span><span style="color:#89DDFF;font-style:italic;">.nil?</span></span>
<span class="line"><span style="color:#A6ACCD;">    thanks</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">t_name</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">unless</span><span style="color:#A6ACCD;"> thanks</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">has_key?</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;">t_name</span><span style="color:#89DDFF;">)</span></span>
<span class="line"><span style="color:#A6ACCD;">    thanks</span><span style="color:#89DDFF;">[</span><span style="color:#A6ACCD;">t_name</span><span style="color:#89DDFF;">]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#A6ACCD;"> lang</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">upcase </span><span style="color:#89DDFF;font-style:italic;">unless</span><span style="color:#A6ACCD;"> lang</span><span style="color:#89DDFF;font-style:italic;">.nil?</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">end</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">thanks </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> thanks</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">to_a</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sort! </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">a</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> a</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">first </span><span style="color:#89DDFF;">&lt;=&gt;</span><span style="color:#A6ACCD;"> b</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">first </span><span style="color:#89DDFF;">}.</span><span style="color:#A6ACCD;">to_h</span></span>
<span class="line"><span style="color:#A6ACCD;">thanks</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">map </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> v</span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;"> v</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">sort! </span><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">thanks_block </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">[]</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">of</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">String</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD;">thanks</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">each </span><span style="color:#89DDFF;font-style:italic;">do </span><span style="color:#89DDFF;">|</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> v</span><span style="color:#89DDFF;">|</span></span>
<span class="line"><span style="color:#A6ACCD;">  thanks_block </span><span style="color:#89DDFF;">&lt;&lt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">#{</span><span style="color:#A6ACCD;">k</span><span style="color:#89DDFF;">}</span><span style="color:#C3E88D;"> (</span><span style="color:#89DDFF;">#{</span><span style="color:#A6ACCD;">v</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">, </span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)}</span><span style="color:#C3E88D;">)</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">end</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">puts</span><span style="color:#A6ACCD;"> thanks_block</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">join</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">\\n</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">)</span></span>
<span class="line"></span></code></pre></div><p>It goes through all <code>.po</code> files, collects the languages each translator contributed to and prints them in the format of &quot;NAME (LANGS)&quot;.</p><p>Using macros, you can then run it in compile-time and assign the output to a variable:</p><div class="language-crystal"><span class="copy"></span><pre><code><span class="line"><span style="color:#FFCB6B;">THANKS</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{{</span><span style="color:#82AAFF;">run</span><span style="color:#89DDFF;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">../../data/scripts/thank_translators</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">).</span><span style="color:#A6ACCD;">stringify</span><span style="color:#89DDFF;">}}</span></span>
<span class="line"></span></code></pre></div>`,8),t=[o];function e(c,D,r,F,y,C){return a(),n("div",null,t)}var d=s(p,[["render",e]]);export{i as __pageData,d as default};
