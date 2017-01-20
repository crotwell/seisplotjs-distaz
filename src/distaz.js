

    /**
     c lat1 => Latitude of first point (+N, -S) in degrees
     c lon1 => Longitude of first point (+E, -W) in degrees
     c lat2 => Latitude of second point
     c lon2 => Longitude of second point
     c
     c getDelta() => Great Circle Arc distance in degrees
     c getAz()    => Azimuth from pt. 1 to pt. 2 in degrees
     c getBaz()   => Back Azimuth from pt. 2 to pt. 1 in degrees
     */
export default function distaz(lat1, lon1, lat2, lon2){
    let result = {
        stalat: lat1,
        stalon: lon1,
        evtlat: lat2,
        evtlon: lon2,
        delta: 0.0,
        az: 0.0,
        baz: 0.0
    };

    if ((lat1 == lat2)&&(lon1 == lon2)) {
        // don't do calc, just return zero for idential points
        return result;
    }
    let scolat, slon, ecolat, elon;
    let a,b,c,d,e,aa,bb,cc,dd,ee,g,gg,h,hh,k,kk;
    let rhs1,rhs2,sph,rad,del,daz,dbaz;

    rad=2.*Math.PI/360.0;
    /*
     c
     c scolat and ecolat are the geocentric colatitudes
     c as defined by Richter (pg. 318)
     c
     c Earth Flattening of 1/298.257 take from Bott (pg. 3)
     c
     */
    sph=1.0/298.257;

    scolat=Math.PI/2.0 - Math.atan((1.-sph)*(1.-sph)*Math.tan(lat1*rad));
    ecolat=Math.PI/2.0 - Math.atan((1.-sph)*(1.-sph)*Math.tan(lat2*rad));
    slon=lon1*rad;
    elon=lon2*rad;
    /*
     c
     c  a - e are as defined by Bullen (pg. 154, Sec 10.2)
     c     These are defined for the pt. 1
     c
     */
    a=Math.sin(scolat)*Math.cos(slon);
    b=Math.sin(scolat)*Math.sin(slon);
    c=Math.cos(scolat);
    d=Math.sin(slon);
    e=-Math.cos(slon);
    g=-c*e;
    h=c*d;
    k=-Math.sin(scolat);
    /*
     c
     c  aa - ee are the same as a - e, except for pt. 2
     c
     */
    aa=Math.sin(ecolat)*Math.cos(elon);
    bb=Math.sin(ecolat)*Math.sin(elon);
    cc=Math.cos(ecolat);
    dd=Math.sin(elon);
    ee=-Math.cos(elon);
    gg=-cc*ee;
    hh=cc*dd;
    kk=-Math.sin(ecolat);
    /*
     c
     c  Bullen, Sec 10.2, eqn. 4
     c
     */
    del=Math.acos(a*aa + b*bb + c*cc);
    result.delta=del/rad;
    /*
     c
     c  Bullen, Sec 10.2, eqn 7 / eqn 8
     c
     c    pt. 1 is unprimed, so this is technically the baz
     c
     c  Calculate baz this way to avoid quadrant problems
     c
     */
    rhs1=(aa-d)*(aa-d)+(bb-e)*(bb-e)+cc*cc - 2.;
    rhs2=(aa-g)*(aa-g)+(bb-h)*(bb-h)+(cc-k)*(cc-k) - 2.;
    dbaz=Math.atan2(rhs1,rhs2);
    if (dbaz<0.0) {
        dbaz=dbaz+2*Math.PI;
    }
    result.baz=dbaz/rad;
    /*
     c
     c  Bullen, Sec 10.2, eqn 7 / eqn 8
     c
     c    pt. 2 is unprimed, so this is technically the az
     c
     */
    rhs1=(a-dd)*(a-dd)+(b-ee)*(b-ee)+c*c - 2.;
    rhs2=(a-gg)*(a-gg)+(b-hh)*(b-hh)+(c-kk)*(c-kk) - 2.;
    daz=Math.atan2(rhs1,rhs2);
    if(daz<0.0) {
        daz=daz+2*Math.PI;
    }
    result.az=daz/rad;
    /*
     c
     c   Make sure 0.0 is always 0.0, not 360.
     c
     */
    if(Math.abs(result.baz-360.) < .00001) result.baz=0.0;
    if(Math.abs(result.az-360.) < .00001) result.az=0.0;
    return result;
}
