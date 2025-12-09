var DataTypes = require("sequelize").DataTypes;
var _DetalleVenta = require("./DetalleVenta");
var _SequelizeMeta = require("./SequelizeMeta");
var _Soy_una_Tabla_Prueba_Borrame = require("./Soy_una_Tabla_Prueba_Borrame");
var _audit_log_entries = require("./audit_log_entries");
var _auditoria = require("./auditoria");
var _buckets = require("./buckets");
var _buckets_analytics = require("./buckets_analytics");
var _cai = require("./cai");
var _caja = require("./caja");
var _compras = require("./compras");
var _comprobantes = require("./comprobantes");
var _detalleCompra = require("./detalleCompra");
var _factura = require("./factura");
var _flow_state = require("./flow_state");
var _identities = require("./identities");
var _instances = require("./instances");
var _lote = require("./lote");
var _messages = require("./messages");
var _mfa_amr_claims = require("./mfa_amr_claims");
var _mfa_challenges = require("./mfa_challenges");
var _mfa_factors = require("./mfa_factors");
var _migrations = require("./migrations");
var _notificaciones = require("./notificaciones");
var _oauth_authorizations = require("./oauth_authorizations");
var _oauth_clients = require("./oauth_clients");
var _oauth_consents = require("./oauth_consents");
var _objects = require("./objects");
var _one_time_tokens = require("./one_time_tokens");
var _permisos = require("./permisos");
var _prefixes = require("./prefixes");
var _producto = require("./producto");
var _proveedores = require("./proveedores");
var _refresh_tokens = require("./refresh_tokens");
var _roles = require("./roles");
var _roles_permisos = require("./roles_permisos");
var _s3_multipart_uploads = require("./s3_multipart_uploads");
var _s3_multipart_uploads_parts = require("./s3_multipart_uploads_parts");
var _saml_providers = require("./saml_providers");
var _saml_relay_states = require("./saml_relay_states");
var _schema_migrations = require("./schema_migrations");
var _schema_migrations = require("./schema_migrations");
var _secrets = require("./secrets");
var _sessions = require("./sessions");
var _sso_domains = require("./sso_domains");
var _sso_providers = require("./sso_providers");
var _subscription = require("./subscription");
var _users = require("./users");
var _users = require("./users");

function initModels(sequelize) {
  var DetalleVenta = _DetalleVenta(sequelize, DataTypes);
  var SequelizeMeta = _SequelizeMeta(sequelize, DataTypes);
  var Soy_una_Tabla_Prueba_Borrame = _Soy_una_Tabla_Prueba_Borrame(sequelize, DataTypes);
  var audit_log_entries = _audit_log_entries(sequelize, DataTypes);
  var auditoria = _auditoria(sequelize, DataTypes);
  var buckets = _buckets(sequelize, DataTypes);
  var buckets_analytics = _buckets_analytics(sequelize, DataTypes);
  var cai = _cai(sequelize, DataTypes);
  var caja = _caja(sequelize, DataTypes);
  var compras = _compras(sequelize, DataTypes);
  var comprobantes = _comprobantes(sequelize, DataTypes);
  var detalleCompra = _detalleCompra(sequelize, DataTypes);
  var factura = _factura(sequelize, DataTypes);
  var flow_state = _flow_state(sequelize, DataTypes);
  var identities = _identities(sequelize, DataTypes);
  var instances = _instances(sequelize, DataTypes);
  var lote = _lote(sequelize, DataTypes);
  var messages = _messages(sequelize, DataTypes);
  var mfa_amr_claims = _mfa_amr_claims(sequelize, DataTypes);
  var mfa_challenges = _mfa_challenges(sequelize, DataTypes);
  var mfa_factors = _mfa_factors(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var notificaciones = _notificaciones(sequelize, DataTypes);
  var oauth_authorizations = _oauth_authorizations(sequelize, DataTypes);
  var oauth_clients = _oauth_clients(sequelize, DataTypes);
  var oauth_consents = _oauth_consents(sequelize, DataTypes);
  var objects = _objects(sequelize, DataTypes);
  var one_time_tokens = _one_time_tokens(sequelize, DataTypes);
  var permisos = _permisos(sequelize, DataTypes);
  var prefixes = _prefixes(sequelize, DataTypes);
  var producto = _producto(sequelize, DataTypes);
  var proveedores = _proveedores(sequelize, DataTypes);
  var refresh_tokens = _refresh_tokens(sequelize, DataTypes);
  var roles = _roles(sequelize, DataTypes);
  var roles_permisos = _roles_permisos(sequelize, DataTypes);
  var s3_multipart_uploads = _s3_multipart_uploads(sequelize, DataTypes);
  var s3_multipart_uploads_parts = _s3_multipart_uploads_parts(sequelize, DataTypes);
  var saml_providers = _saml_providers(sequelize, DataTypes);
  var saml_relay_states = _saml_relay_states(sequelize, DataTypes);
  var schema_migrations = _schema_migrations(sequelize, DataTypes);
  var schema_migrations = _schema_migrations(sequelize, DataTypes);
  var secrets = _secrets(sequelize, DataTypes);
  var sessions = _sessions(sequelize, DataTypes);
  var sso_domains = _sso_domains(sequelize, DataTypes);
  var sso_providers = _sso_providers(sequelize, DataTypes);
  var subscription = _subscription(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  permisos.belongsToMany(roles, { as: 'rol_id_roles', through: roles_permisos, foreignKey: "permiso_id", otherKey: "rol_id" });
  roles.belongsToMany(permisos, { as: 'permiso_id_permisos', through: roles_permisos, foreignKey: "rol_id", otherKey: "permiso_id" });
  factura.belongsTo(cai, { as: "cai", foreignKey: "cai_id"});
  cai.hasMany(factura, { as: "facturas", foreignKey: "cai_id"});
  comprobantes.belongsTo(caja, { as: "caja", foreignKey: "caja_id"});
  caja.hasMany(comprobantes, { as: "comprobantes", foreignKey: "caja_id"});
  detalleCompra.belongsTo(compras, { as: "compra", foreignKey: "compra_id"});
  compras.hasMany(detalleCompra, { as: "detalleCompras", foreignKey: "compra_id"});
  DetalleVenta.belongsTo(factura, { as: "factura", foreignKey: "factura_id"});
  factura.hasMany(DetalleVenta, { as: "DetalleVenta", foreignKey: "factura_id"});
  comprobantes.belongsTo(factura, { as: "factura", foreignKey: "factura_id"});
  factura.hasMany(comprobantes, { as: "comprobantes", foreignKey: "factura_id"});
  roles_permisos.belongsTo(permisos, { as: "permiso", foreignKey: "permiso_id"});
  permisos.hasMany(roles_permisos, { as: "roles_permisos", foreignKey: "permiso_id"});
  DetalleVenta.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(DetalleVenta, { as: "DetalleVenta", foreignKey: "producto_id"});
  auditoria.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(auditoria, { as: "auditoria", foreignKey: "producto_id"});
  detalleCompra.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(detalleCompra, { as: "detalleCompras", foreignKey: "producto_id"});
  lote.belongsTo(producto, { as: "producto", foreignKey: "producto_id"});
  producto.hasMany(lote, { as: "lotes", foreignKey: "producto_id"});
  compras.belongsTo(proveedores, { as: "proveedor", foreignKey: "proveedor_id"});
  proveedores.hasMany(compras, { as: "compras", foreignKey: "proveedor_id"});
  roles_permisos.belongsTo(roles, { as: "rol", foreignKey: "rol_id"});
  roles.hasMany(roles_permisos, { as: "roles_permisos", foreignKey: "rol_id"});
  users.belongsTo(roles, { as: "rol", foreignKey: "rol_id"});
  roles.hasMany(users, { as: "users", foreignKey: "rol_id"});
  auditoria.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(auditoria, { as: "auditoria", foreignKey: "user_id"});
  caja.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(caja, { as: "cajas", foreignKey: "user_id"});
  compras.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(compras, { as: "compras", foreignKey: "user_id"});
  notificaciones.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(notificaciones, { as: "notificaciones", foreignKey: "user_id"});

  return {
    DetalleVenta,
    SequelizeMeta,
    Soy_una_Tabla_Prueba_Borrame,
    audit_log_entries,
    auditoria,
    buckets,
    buckets_analytics,
    cai,
    caja,
    compras,
    comprobantes,
    detalleCompra,
    factura,
    flow_state,
    identities,
    instances,
    lote,
    messages,
    mfa_amr_claims,
    mfa_challenges,
    mfa_factors,
    migrations,
    notificaciones,
    oauth_authorizations,
    oauth_clients,
    oauth_consents,
    objects,
    one_time_tokens,
    permisos,
    prefixes,
    producto,
    proveedores,
    refresh_tokens,
    roles,
    roles_permisos,
    s3_multipart_uploads,
    s3_multipart_uploads_parts,
    saml_providers,
    saml_relay_states,
    schema_migrations,
    schema_migrations,
    secrets,
    sessions,
    sso_domains,
    sso_providers,
    subscription,
    users,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
