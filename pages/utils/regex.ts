export class Regex {
  public static PHONE = /^([+]?[0-9]{1,3}( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[0-9]{7})$/;
  public static POSTAL_CODE = `^[a-zA-Z0-9 -]{3,10}`;
  public static LATITUDE = /^(\+|-)?(?:90(?:(?:\.0{1,8})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,8})?))$/;
  public static LONGITUDE = /^(\+|-)?(?:180(?:(?:\.0{1,8})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,8})?))$/;
  public static WEBSITE = `^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|(www\\.)?){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+` +
    `((\\.[a-zA-Z0-9]{2,10})+)(/(.))?(\\?(.))?`;
  public static NAME = `^[a-zA-Z ]*$`;
  public static EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
  public static DOT = /^[0-9]*[.]{0,1}[0-9]{1,8}$/;
  public static DECIMAL = /^[+|-]?\d+([.]\d{1,8})?$/;
  public static POSITIVE_INTEGER = /^\d{1,8}[^./,;':@]?$/;
  public static ALPHA_NUMERIC = '^[a-zA-Z0-9]*$';
  public static NUMERIC = '^[0-9]*$';
  public static readonly IP_ADDRESS = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  public static readonly MAC_ADDRESS = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  public static readonly AlPHA_NUMERIC_DECIMAL_SEPARATION = /^[A-Za-z0-9]+([.]{1}[A-Za-z0-9]+)+$/;
  public static readonly AlPHA_NUMERIC_DECIMAL_SEPARATION_WITH_SPACE = /^[A-Za-z0-9 ]+([A-Za-z0-9][.]{1}[A-Za-z0-9]*)+$/;
  public static readonly HOST_NAME = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-][a-zA-Z0-9])\.)([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;
  public static readonly URL = /^(?:http(s)?:\/\/)+[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  public static DNS_FULLY_QUALIFIED_DOMAIN_NAME = /^[a-zA-Z0-9]([\w -_.][a-zA-Z0-9])$/;
}
