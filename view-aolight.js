import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import '@material/mwc-textfield';
import '@material/mwc-button';

import { shared_styles } from '../lib/shared-styles.js';
import '../lib/zwgd-client.js';

@customElement('view-aolight')
export class ViewAolight extends LitElement {
  static styles = [
    shared_styles,
    css`
      #chat {
        width: 100%;
      }
      #dbgdata {
        width: 100%;
      }
      .indicator {
	width: 100px;
        height: 40px;
        border-radius: 5px;
        margin: 10px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
      }
      .yellow {
        background-color: #FFFF00;
      }
      .green {
        background-color: #00FF00;
      }
      .light-grey {
        background-color: #D3D3D3;
      }
      .stat-vals{ 
        width:  350px;
        background-color: #ADD8E6;
    `,
  ]

  render_left() {
    return html`
<table>
 <tr> <td colspan=9 align=center style="font-size: 30px" bgcolor=${this.r0g}>
   <div class="indicator stat-vals">${this.r0t}</div></td>
 <tr> <td colspan=9><hr></td> </tr>
 <tr>
  <td bgcolor=black></td>
  <td align=center width=275><h1><u>Loop</u></h1></td>
  <td bgcolor=black></td>
  <td align=left style="vertical-align: bottom;" width=275><h1>&nbsp;Slope RMS:</h1></td>
  <td bgcolor=black></td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275>
    <div class="indicator ${this.p01}">Open</div>
    </td>
  <td bgcolor=black></td>
  <td align=right width=275><h1>${this.s01} nm&nbsp;</td>
  <td bgcolor=black></td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275>
    <div class="indicator ${this.p02}">Closed</div>
    </td>
  <td bgcolor=black></td>
  <td align=left style="vertical-align: bottom;" width=275><h1>&nbsp;Est. Strehl:</h1></td>
  <td bgcolor=black></td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275>
    <div class="indicator ${this.p03}">Paused</div>
    </td>
  <td bgcolor=black></td>
  <td vertical-align=middle align=right width=275>
     <div id=s02><h1>${this.s03}&nbsp;<div></td>
  <td bgcolor=black></td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275>
    <div class="indicator ${this.p04}">Fault</div>
    </td>
  <td bgcolor=black></td>
  <td></td>
  <td bgcolor=black></td>
 </tr>
</table>
    `;
  }

  render_all() {
    return html`
<table>
 <tr> <td colspan=9 align=center style="font-size: 30px" bgcolor=${this.r0g}>
   ${this.r0t}</td>
 <tr> <td colspan=9><hr></td> </tr>
 <tr>
  <td bgcolor=black></td>
  <td align=center width=275><h1><u>Loop</u></h1></td>
  <td bgcolor=black></td>
  <td align=left style="vertical-align: bottom;" width=275><h1>&nbsp;Slope RMS:</h1></td>
  <td bgcolor=black></td>
  <td style="vertical-align: top;" align=right> <h1>AO Preset&nbsp;</h1> </td>
  <td>
   <svg width=50 height=70><circle id=r1g cx=25 cy=25 r=20 fill=${this.r1g}></svg> 
   </td>
  <td>
   <svg width=50 height=70><circle id=r1y cx=25 cy=25 r=20 fill=${this.r1y}></svg> 
   </td>
  <td>
   <svg width=50 height=70><circle id=r1r cx=25 cy=25 r=20 fill=${this.r1r}></svg> 
   </td>
  <td style="vertical-align: top;">
        <div id=r1t><h2>${this.r1t}</h2></div>
  </td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275
bgcolor=${this.p01}>
    <h1 bgcolor=blue>Open</h1></td>
  <td bgcolor=black></td>
  <td align=right width=275><h1>${this.s01} nm&nbsp;</td>
  <td bgcolor=black></td>
  <td style="vertical-align: top;" align=right> <h1>Center Star&nbsp;</h1>
  <td>
   <svg width=50 height=70><circle id=r2g cx=25 cy=25 r=20 fill=${this.r2g}></svg> 
  <td>
   <svg width=50 height=70><circle id=r2y cx=25 cy=25 r=20 fill=${this.r2y}></svg> 
  <td>
   <svg width=50 height=70><circle id=r2r cx=25 cy=25 r=20 fill=${this.r2r}></svg> 
  <td style="vertical-align: top;">
        <div id=r2t><h2>${this.r2t}</h2></div>
  </td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275
bgcolor=${this.p02}>
    <h1>Closed</h1></td>
  <td bgcolor=black></td>
  <td align=left style="vertical-align: bottom;" width=275><h1>&nbsp;Seeing:</h1></td>
  <td bgcolor=black></td>
  <td style="vertical-align: top;" align=right><h1>Center Pupils&nbsp;</h1>
  <td>
   <svg width=50 height=70><circle id=r3g cx=25 cy=25 r=20 fill=${this.r3g}></svg> 
  <td>
   <svg width=50 height=70><circle id=r3y cx=25 cy=25 r=20 fill=${this.r3y}></svg> 
  <td>
   <svg width=50 height=70><circle id=r3r cx=25 cy=25 r=20 fill=${this.r3r}></svg> 
  <td style="vertical-align: top;">
        <div id=r3t><h2>${this.r3t}</h2></div>
  </td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275
bgcolor=${this.p03}>
    <h1>Paused</h1></td>
  <td bgcolor=black></td>
  <td vertical-align=middle align=right width=275>
     <div id=s02><h1>${this.s02} arcsec&nbsp;<div></td>
  <td bgcolor=black></td>
  <td style="vertical-align: top;" align=right><h1>Check Flux&nbsp;</h1>
  <td>
   <svg width=50 height=70><circle id=r4g cx=25 cy=25 r=20 fill=${this.r4g}></svg> 
  <td>
   <svg width=50 height=70><circle id=r4y cx=25 cy=25 r=20 fill=${this.r4y}></svg> 
  <td>
   <svg width=50 height=70><circle id=r4r cx=25 cy=25 r=20 fill=${this.r4r}></svg> 
  <td style="vertical-align: top;">
        <div id=r4t><h2>${this.r4t}</h2></div>
  </td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td vertical-align=middle align=center width=275
bgcolor=${this.p04}>
    <h1>Fault</h1></td>
  <td bgcolor=black></td>
  <td align=left style="vertical-align: bottom;" width=275><h1>&nbsp;Est. Strehl:</h1></td>
  <td bgcolor=black></td>
  <td style="vertical-align: top;" align=right><h1>Close Loop&nbsp;</h1>
  <td>
   <svg width=50 height=70><circle id=r5g cx=25 cy=25 r=20 fill=${this.r5g}></svg> 
  <td>
   <svg width=50 height=70><circle id=r5y cx=25 cy=25 r=20 fill=${this.r5y}></svg> 
  <td>
   <svg width=50 height=70><circle id=r5r cx=25 cy=25 r=20 fill=${this.r5r}></svg> 
  <td style="vertical-align: top;">
        <div id=r5t><h2>${this.r5t}</h2></div>
  </td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td></td>
  <td></td>
  <td vertical-align=middle align=right width=275><h1>${this.s03} &nbsp;</td>
  <td bgcolor=black></td>
  <td style="vertical-align: top;" align=right><h1>Optimize Gain&nbsp;</h1>
  <td>
   <svg width=50 height=70><circle id=r6g cx=25 cy=25 r=20 fill=${this.r6g}></svg> 
  <td>
   <svg width=50 height=70><circle id=r6y cx=25 cy=25 r=20 fill=${this.r6y}></svg> 
  <td>
   <svg width=50 height=70 id=r6r><circle cx=25 cy=25 r=20 fill=${this.r6r}></svg> 
  <td style="vertical-align: top;">
        <div id=r6t><h2>${this.r6t}</h2></div>
  </td>
 </tr>
 <tr>
  <td bgcolor=black></td>
  <td></td>
  <td></td>
  <td></td>
  <td bgcolor=black></td>
  <td style="vertical-align: top;" align=right><h1>&nbsp;Apply Optical Gain&nbsp;</h1>
  <td>
   <svg width=50 height=70><circle id=r7g cx=25 cy=25 r=20 fill=${this.r7g}></svg> 
  <td>
   <svg width=50 height=70><circle id=r7y cx=25 cy=25 r=20 fill=${this.r7y}></svg> 
  <td>
   <svg width=50 height=70><circle id=r7r cx=25 cy=25 r=20 fill=${this.r7r}></svg> 
  <td style="vertical-align: top;">
        <div id=r7t><h2>${this.r7t}</h2></div>
  </td>
 </tr>
</table>
    `;
  }
    

  render() {
    return html`
<style>
{
  font-family: Helvetica, Sans-Serif;
}
td {
  padding-bottom: 0px;
  padding-top: 0px;
}
/*
table {
  border-spacing: 30px;
}
*/
svg {
  stroke: gray;
  stroke-width: 5;
  width: 50;
  height: 75;
}
h1 {
  vertical-align: middle;
}
</style>

      ${this.render_left()}
      <div class="card">
        <b>State: </b>${this.state}
        </br>
        </br>
        <mwc-textfield id=chat outlined label="message" @change=${this.send_chat_message} disabled></mwc-textfield>
        </br>
        </br>
        <mwc-button id=subscribe @click=${this.subscribe} raised disabled>SUBscribe</mwc-button>
        <mwc-button id=unsubscribe @click=${this.unsubscribe} raised disabled>Unsubscribe</mwc-button>
        <mwc-button id=connect @click=${this.connect} raised>Connect</mwc-button>
        <mwc-button id=disconnect @click=${this.disconnect} raised>Disconnect</mwc-button>
        <mwc-button id=test @click=${this.test} raised>Test</mwc-button>
        </br>
        </br>
        <b>Data:</b>
        </br>
        <div id=dbgdata>${this.dbgdata}</div>
        </br>
        <b>Data:</b>
        </br>
        <div id=r1t>${this.r1t}</div>
      </div>

      <zwgd-client
        id=zwgd
        name=zwgdemo
        producers=["demo1"]
        creds={"user":"streamer","passwd":"lbto","domain":"zwgdemo"}
        @onmessage=${this.onmessage}  
        @onevent=${this.onevent} 
      ></zwgd-client>
    `;
  }

  @query('#zwgd') accessor $zwgd;
  @query('#chat') accessor $chat;
  @query('#subscribe') accessor $subscribe;
  @query('#unsubscribe') accessor $unsubscribe;
  @query('#connect') accessor $connect;
  @query('#disconnect') accessor $disconnect;
  @query('#test') accessor $test;

  @query('#s01') accessor $s01;
  @query('#s02') accessor $s02;
  @query('#s03') accessor $s03;

  @query('#p01') accessor $p01;
  @query('#p02') accessor $p02;
  @query('#p03') accessor $p03;
  @query('#p04') accessor $p04;
  @query('#r0t') accessor $r0t;
  @query('#r0g') accessor $r0g;
  @query('#r1g') accessor $r1g;
  @query('#r1y') accessor $r1y;
  @query('#r1r') accessor $r1r;
  @query('#r1t') accessor $r1t;
  @query('#r2g') accessor $r2g;
  @query('#r2y') accessor $r2y;
  @query('#r2r') accessor $r2r;
  @query('#r2t') accessor $r2t;
  @query('#r3g') accessor $r3g;
  @query('#r3y') accessor $r3y;
  @query('#r3r') accessor $r3r;
  @query('#r3t') accessor $r3t;
  @query('#r4g') accessor $r4g;
  @query('#r4y') accessor $r4y;
  @query('#r4r') accessor $r4r;
  @query('#r4t') accessor $r4t;
  @query('#r5g') accessor $r5g;
  @query('#r5y') accessor $r5y;
  @query('#r5r') accessor $r5r;
  @query('#r5t') accessor $r5t;
  @query('#r6g') accessor $r6g;
  @query('#r6y') accessor $r6y;
  @query('#r6r') accessor $r6r;
  @query('#r6t') accessor $r6t;
  @query('#r7g') accessor $r7g;
  @query('#r7y') accessor $r7y;
  @query('#r7r') accessor $r7r;
  @query('#r7t') accessor $r7t;

  updateLeftRow ( rownum, color, text ) {
    switch (rownum) {
      case 11:
        this.p01 = color;
        break;
      case 12:
        this.p02 = color;
        break;
      case 13:
        this.p03 = color;
        break;
      case 14:
        this.p04 = color;
        break;
      case 21:
        this.s01 = text;
        break;
      case 22:
        this.s02 = text;
        break;
      case 23:
        this.s03 = text;
        break;
    }
  }

  updateRightRow ( rownum, gcolor, ycolor, rcolor, text ) {
    switch (rownum) {
      case 0:
        this.r0g = gcolor;
        this.r0t = text;
        break;
      case 1:
        this.r1g = gcolor;
        this.r1y = ycolor;
        this.r1r = rcolor;
        this.r1t = text;
        break;
      case 2:
        this.r2g = gcolor;
        this.r2y = ycolor;
        this.r2r = rcolor;
        this.r2t = text;
        break;
      case 3:
        this.r3g = gcolor;
        this.r3y = ycolor;
        this.r3r = rcolor;
        this.r3t = text;
        break;
      case 4:
        this.r4g = gcolor;
        this.r4y = ycolor;
        this.r4r = rcolor;
        this.r4t = text;
        break;
      case 5:
        this.r5g = gcolor;
        this.r5y = ycolor;
        this.r5r = rcolor;
        this.r5t = text;
        break;
      case 6:
        this.r6g = gcolor;
        this.r6y = ycolor;
        this.r6r = rcolor;
        this.r6t = text;
        break;
      case 7:
        this.r7g = gcolor;
        this.r7y = ycolor;
        this.r7r = rcolor;
        this.r7t = text;
        break;
    }
  }

  updateAll( data ) {
    this.updateRightRow( 0, data.row00gc, "", "", data.row00text );
    this.updateLeftRow( 11, data.row11color, data.row11text )
    this.updateLeftRow( 12, data.row12color, data.row12text )
    this.updateLeftRow( 13, data.row13color, data.row13text )
    this.updateLeftRow( 14, data.row14color, data.row14text )
    this.updateLeftRow( 21, data.row21color, data.row21text );
    this.updateLeftRow( 23, data.row23color, data.row23text )
  }

  resetAll() {
    this.updateRightRow( 0, "white", "", "", "Ready for Acquisition" );
    this.updateRightRow( 1, "gray", "gray", "gray", "" );
    this.updateRightRow( 2, "gray", "gray", "gray", "" );
    this.updateRightRow( 3, "gray", "gray", "gray", "" );
    this.updateRightRow( 4, "gray", "gray", "gray", "" );
    this.updateRightRow( 5, "gray", "gray", "gray", "" );
    this.updateRightRow( 6, "gray", "gray", "gray", "" );
    this.updateRightRow( 7, "gray", "gray", "gray", "" );
    this.updateLeftRow( 11, "lightgray", "" );
    this.updateLeftRow( 12, "lightgray", "" );
    this.updateLeftRow( 13, "lightgray", "" );
    this.updateLeftRow( 14, "lightgray", "" );
    this.updateLeftRow( 21, ""         , "UNK" );
    this.updateLeftRow( 22, ""         , "UNK" );
    this.updateLeftRow( 23, ""         , "UNK" );
  }

  send_chat_message(evt) {
    this.$zwgd.send(this.$chat.value);
    this.$chat.value = '';
  }

  subscribe() {
    this.$zwgd.subscribe();
  }

  unsubscribe() {
    this.$zwgd.unsubscribe();
  }

  disconnect() {
    this.$zwgd.disconnect();
  }

  connect(e) {
    this.$zwgd.connect();
  }

  test(e) {
    this.updateRightRow( 1, "lime", "gray", "red", "Completo" )
    this.updateRightRow( 2, "lime", "gray", "red", "Complete" )
    this.updateRightRow( 3, "lime", "gray", "red", "Complete" )
    this.updateRightRow( 4, "lime", "gray", "red", "Complete" )
    this.updateRightRow( 5, "lime", "gray", "red", "Complete" )
    this.updateRightRow( 6, "lime", "gray", "red", "Complete" )
    this.updateRightRow( 7, "lime", "gray", "red", "Complete" )
  }

  onmessage(e) {
    const data = e.detail;
    this.dbgdata = JSON.stringify(data);
    this.text    = JSON.stringify(data);
    this.indx    = this.text.indexOf( "text" ) + 7    // kludge
    this.end     = this.text.length - 2
    if (data.row == 711 ) {
      this.updateAll( data )
    }
    else if (data.row >= 11 ) {
      this.updateLeftRow( data.row, data.color, 
	    this.text.substring(this.indx,this.end) )
    }
    else if (data.row >= 0 ) {
      this.updateRightRow( data.row, data.gc, data.yc, data.rc,
	    this.text.substring(this.indx,this.end) )
    }
    else {
      this.resetAll()
    }
  }

  onevent(e) {
    this.state = e.detail;
    if (this.state == 'open') {
      this.$chat.disabled = false;
      this.$subscribe.disabled = false;
      this.$unsubscribe.disabled = false;
    } else {
      this.$chat.disabled = true;
      this.$subscribe.disabled = true;
      this.$unsubscribe.disabled = true;
    }
  }

  async firstUpdatedWithChildren() {
    await this.$zwgd.updateComplete;
    this.$zwgd.alive = true;
  }

  firstUpdated() {
    this.firstUpdatedWithChildren();
  }

  @state() accessor dbgdata = '';
  @state({ type: String }) accessor state = 'indef';
}
