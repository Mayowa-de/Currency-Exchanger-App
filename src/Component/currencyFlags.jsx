import ae from '../assets/images/flags/ae.webp'
import ar from '../assets/images/flags/ar.webp'
import au from '../assets/images/flags/au.webp'
import bd from '../assets/images/flags/bd.webp'
import bg from '../assets/images/flags/bg.webp'
import bh from '../assets/images/flags/bh.webp'
import br from '../assets/images/flags/br.webp'
import ca from '../assets/images/flags/ca.webp'
import ch from '../assets/images/flags/ch.webp'
import cl from '../assets/images/flags/cl.webp'
import cn from '../assets/images/flags/cn.webp'
import co from '../assets/images/flags/co.webp'
import cy from '../assets/images/flags/cy.webp'
import cz from '../assets/images/flags/cz.webp'
import dk from '../assets/images/flags/dk.webp'
import eg from '../assets/images/flags/eg.webp'
import eu from '../assets/images/flags/eu.webp'
import gb from '../assets/images/flags/gb.webp'
import hk from '../assets/images/flags/hk.webp'
import hu from '../assets/images/flags/hu.webp'
import id from '../assets/images/flags/id.webp'
import in_ from '../assets/images/flags/in.webp'
import is_ from '../assets/images/flags/is.webp'
import jp from '../assets/images/flags/jp.webp'
import kr from '../assets/images/flags/kr.webp'
import mx from '../assets/images/flags/mx.webp'
import my from '../assets/images/flags/my.webp'
import ng from '../assets/images/flags/ng.webp'
import no from '../assets/images/flags/no.webp'
import nz from '../assets/images/flags/nz.webp'
import ph from '../assets/images/flags/ph.webp'
import pl from '../assets/images/flags/pl.webp'
import ro from '../assets/images/flags/ro.webp'
import se from '../assets/images/flags/se.webp'
import sg from '../assets/images/flags/sg.webp'
import th from '../assets/images/flags/th.webp'
import tr from '../assets/images/flags/tr.webp'
import us from '../assets/images/flags/us.webp'
import za from '../assets/images/flags/za.webp'

const flagMap = {
  ae, ar, au, bd, bg, bh, br, ca, ch,
  cl, cn, co, cy, cz, dk, eg, eu, gb,
  hk, hu, id, jp, kr, mx, my, ng,
  no, nz, ph, pl, ro, se, sg, th, tr,
  us, za,
  in: in_,
  is: is_,
}

export const getFlag = (code) => {
  const country = code.slice(0, 2).toLowerCase()
  return flagMap[country] ?? null
}
