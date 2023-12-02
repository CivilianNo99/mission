<button class="button">

</button>

<style>

  .btn {
    --btn-padding: .4em .8em;
    --btn-font-size-sm: var(--text-size-sm);
    --btn-font-size-md: var(--text-size-md);
  
    --btn-padding-lg: 0.7em 3em;
    --btn-font-size-lg: var(--text-size-lg);

    display: inline-block;
    margin: 0;

    font-family: "Mada", sans-serif;
    font-weight: 400;
    text-align: center;
    text-decoration: none;
    line-height: 1;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: middle;
    
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    /* color: $fg; */
    -webkit-tap-highlight-color: transparent;
    background-color: transparent;
    border: 0;
    
    user-select: none;
    cursor: default;
  }

  .icon::before {
    font-family: "Font Awesome 5 Free";
    font-weight: 900;
    /* content: $code-point; */
  }  
  .icon.left::before {
    margin-right: 0.4em;
  }
  .icon.right::before {
    margin-left: 0.4em;
  }
  .icon.within::before {
    margin-left: 0.4em;
    margin-right: 0.4em;
  }

  .shpe-round {
    border-radius: var(--radius-sm);
  }
  .shape-hotdog {
    border-radius: 30px;
  }

  .size-sm {
    font-size: var(--btn-font-size-sm);
  }
  .size-md {
    font-size: var(--btn-font-size-md);
  }
  .size-lg {
    font-size: var(--btn-font-size-lg);
  }

  .filled.size-sm {
    font-size: var(--btn-font-size-sm);
    padding: var(--btn-padding);
  }
  .filled.size-md {
    font-size: var(--btn-font-size-md);
    padding: var(--btn-padding);
  }
  .filled.size-lg {
    padding: var(--btn-padding-lg);
    font-size: var(--btn-font-size-lg);
  }

  .hoverable:hover {
    /* color: $fg;
    background-color: $bg; */
  }

  .activatable {
    cursor: pointer;
  }
  .activatable:active {
    /* color: $fg;
    background-color: $bg;
    transform: scale(.95); */
  }

  /* Focus state. */
  .foucsable:focus-visible {
    /* color: $fg;
    background-color: $bg; */
  }
  .foucsable.outline {
    /* outline: 0 solid $outline; */
    outline-offset: 5px;
  }
  .foucsable.outline:focus-visible {
    outline-width: 1px;
  }

  .disabled,
  .disabled:hover,
  .disabled:focus,
  .disabled:active {
    cursor: not-allowed;
    /* color: $fg;
    background-color: $bg; */
  }

  
  /* .rect { @include creators.shape("rect"); }
  .hotdog { @include creators.shape("hotdog"); } */


  // Sizes

  .sm {
    @include creators.size("sm", $filled: false);
    &.filled { @include creators.size("sm", $filled: true); }
  }

  .md {
    @include creators.size("md", $filled: false);
    &.filled { @include creators.size("md", $filled: true); }
  }

  .lg {
    @include creators.size("lg", $filled: false);
    &.filled { @include creators.size("lg", $filled: true); }
  }


  // Themes

  .gray {
    @extend .btn;
    @include themer.apply-theme(themes.$gray);
  }

  .blue {
    @extend .btn;
    @include themer.apply-theme(themes.$blue);
  }

  .red {
    @extend .btn;
    @include themer.apply-theme(themes.$red);
  }

  .lightest {
    @extend .btn;
    @include themer.apply-theme(themes.$lightest);
  }


  /* Other */

  .block {
    display: block;
    width: 100%;
  }
</style>