/ *!
 Biblioteca jQuery JavaScript v1.6.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dupla licença sob as licenças MIT ou GPL Versão 2.
 * http://jquery.org/license
 *
 * Inclui Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, Fundação Dojo
 * Lançado sob as licenças MIT, BSD e GPL.
 *
 * Data: Qui. 30 de junho 14:16:56 2011 -0400
 * /
(função (janela, indefinida) {

// Use o documento correto de acordo com o argumento window (sandbox)
var document = window.document,
	navigator = window.navigator,
	location = window.location;
var jQuery = (function () {

// Define uma cópia local do jQuery
var jQuery = função (seletor, contexto) {
		// O objeto jQuery é na verdade apenas o construtor init 'aprimorado'
		retornar novo jQuery.fn.init (seletor, contexto, rootjQuery);
	}

	// Mapa sobre o jQuery em caso de substituição
	_jQuery = window.jQuery,

	// Mapeie o $ em caso de substituição
	_ $ = window. $,

	// Uma referência central para o jQuery raiz (documento)
	rootjQuery,

	// Uma maneira simples de verificar seqüências de caracteres HTML ou ID
	// (para os quais otimizamos)
	quickExpr = / ^ (?: [^ <] * (<[\ w \ W] +>) [^>] * $ | # ([\ w \ -] *) $) /,

	// Verifique se uma string possui um caractere que não seja um espaço em branco
	rnotwhite = / \ S /,

	// Usado para aparar espaços em branco
	trimLeft = / ^ \ s + /,
	trimRight = / \ s + $ /,

	// Verifique se há dígitos
	rdigit = / \ d /,

	// Corresponde a uma tag autônoma
	rsingleTag = / ^ <(\ w +) \ s * \ /?> (?: <\ / \ 1>)? $ /,

	// JSON RegExp
	rvalidchars = / ^ [\],: {} \ s] * $ /,
	rvalidescape = / \\ (?: ["\\\ / bfnrt] | u [0-9a-fA-F] {4}) / g,
	rvalidtokens = / "[^" \\\ n \ r] * "| true | false | null | -? \ d + (?: \. \ d *)? (?: [eE] [+ \ -]? \ d +)? / g,
	rvalidbraces = / (?: ^ |: |,) (?: \ s * \ [) + / g,

	// RegExp do agente do usuário
	rwebkit = / (webkit) [\ /] ([\ w.] +) /,
	ropera = / (ópera) (?:. * versão)? [\ /] ([\ w.] +) /,
	rmsie = / (msie) ([\ w.] +) /,
	rmozilla = /(mozilla)(?:.*? rv: ([\ w.] +))? /,

	// Corresponde à sequência tracejada para camelizar
	rdashAlpha = / - ([az]) / ig,

	// Usado pelo jQuery.camelCase como retorno de chamada para substituir ()
	fcamelCase = função (tudo, letra) {
		carta de retorno.toUpperCase ();
	}

	// Mantenha uma string UserAgent para uso com jQuery.browser
	userAgent = navigator.userAgent,

	// Para combinar o mecanismo e a versão do navegador
	browserMatch,

	// O adiado usado no DOM pronto
	readyList,

	// O manipulador de eventos pronto
	DOMContentLoaded,

	// Salve uma referência a alguns métodos principais
	toString = Object.prototype.toString,
	hasOwn = Object.prototype.hasOwnProperty,
	push = Array.prototype.push,
	slice = Array.prototype.slice,
	trim = String.prototype.trim,
	indexOf = Array.prototype.indexOf,

	// [[Class]] -> pares de tipos
	class2type = {};

jQuery.fn = jQuery.prototype = {
	construtor: jQuery,
	init: function (seletor, contexto, rootjQuery) {
		var match, elem, ret, doc;

		// Manipula $ (""), $ (nulo) ou $ (indefinido)
		if (! seletor) {
			devolva isso;
		}

		// Manipula $ (DOMElement)
		if (selector.nodeType) {
			this.context = this [0] = seletor;
			this.length = 1;
			devolva isso;
		}

		// O elemento body existe apenas uma vez, otimize encontrá-lo
		if (seletor === "corpo" &&! context && document.body) {
			this.context = documento;
			this [0] = document.body;
			this.selector = seletor;
			this.length = 1;
			devolva isso;
		}

		// Manipula cadeias de caracteres HTML
		if (typeof selector === "string") {
			// Estamos lidando com uma string HTML ou um ID?
			if (selector.charAt (0) === "<" && selector.charAt (selector.length - 1) === ">" && selector.length> = 3) {
				// Suponha que as strings que começam e terminam com <> sejam HTML e pule a verificação de regex
				match = [nulo, seletor, nulo];

			} outro {
				match = quickExpr.exec (seletor);
			}

			// Verifique uma correspondência e se nenhum contexto foi especificado para #id
			if (correspondência && (correspondência [1] ||! contexto)) {

				// HANDLE: $ (html) -> $ (matriz)
				if (corresponder [1]) {
					context = context instanceof jQuery? contexto [0]: contexto;
					doc = (context? context.ownerDocument || context: document);

					// Se uma única string é passada e é uma única tag
					// apenas faça um createElement e pule o resto
					ret = rsingleTag.exec (seletor);

					se (ret) {
						if (jQuery.isPlainObject (context)) {
							seletor = [document.createElement (ret [1])];
							jQuery.fn.attr.call (seletor, contexto, verdadeiro);

						} outro {
							seletor = [doc.createElement (ret [1])];
						}

					} outro {
						ret = jQuery.buildFragment ([match [1]], [doc]);
						seletor = (ret.cacheable? jQuery.clone (ret.fragment): ret.fragment) .childNodes;
					}

					retornar jQuery.merge (this, selector);

				// HANDLE: $ ("# id")
				} outro {
					elem = document.getElementById (match [2]);

					// Verifique parentNode para capturar quando o Blackberry 4.6 retornar
					// nós que não estão mais no documento # 6963
					if (elem && elem.parentNode) {
						// Lida com o caso em que o IE e o Opera retornam itens
						// por nome em vez de ID
						if (elem.id! == corresponde a [2]) {
							retornar rootjQuery.find (seletor);
						}

						// Caso contrário, injetamos o elemento diretamente no objeto jQuery
						this.length = 1;
						this [0] = elem;
					}

					this.context = documento;
					this.selector = seletor;
					devolva isso;
				}

			// HANDLE: $ (expr, $ (...))
			} else if (! context || context.jquery) {
				return (contexto || rootjQuery) .find (seletor);

			// HANDLE: $ (expr, contexto)
			// (que é apenas equivalente a: $ (context) .find (expr)
			} outro {
				retorne this.constructor (context) .find (seletor);
			}

		// HANDLE: $ (função)
		// Atalho para o documento pronto
		} else if (jQuery.isFunction (seletor)) {
			retornar rootjQuery.ready (seletor);
		}

		if (selector.selector! == indefinido) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		retornar jQuery.makeArray (seletor, este);
	}

	// Comece com um seletor vazio
	seletor: "",

	// A versão atual do jQuery sendo usada
	jquery: "1.6.2",

	// O comprimento padrão de um objeto jQuery é 0
	comprimento: 0,

	// O número de elementos contidos no conjunto de elementos correspondentes
	size: function () {
		retorne this.length;
	}

	toArray: function () {
		retornar slice.call (este, 0);
	}

	// Pega o enésimo elemento no conjunto de elementos correspondentes OR
	// Pega todo o conjunto de elementos correspondentes como uma matriz limpa
	get: function (num) {
		return num == null?

			// Retorna uma matriz 'limpa'
			this.toArray ():

			// Retorna apenas o objeto
			(num <0? this [this.length + num]: this [num]);
	}

	// Pegue uma matriz de elementos e empurre-a para a pilha
	// (retornando o novo conjunto de elementos correspondentes)
	pushStack: função (elems, nome, seletor) {
		// Construa um novo conjunto de elementos correspondentes ao jQuery
		var ret = this.constructor ();

		if (jQuery.isArray (elems)) {
			push.apply (ret, elems);

		} outro {
			jQuery.merge (ret, elems);
		}

		// Adicione o objeto antigo na pilha (como referência)
		ret.prevObject = this;

		ret.context = this.context;

		if (name === "find") {
			ret.selector = this.selector + (this.selector? "": "") + seletor;
		} senão se (nome) {
			ret.selector = this.selector + "." + nome + "(" + seletor + ")";
		}

		// Retorna o conjunto de elementos recém-formado
		return ret;
	}

	// Executa um retorno de chamada para cada elemento no conjunto correspondente.
	// (Você pode propagar os argumentos com uma matriz de args, mas isso é
	// usado somente internamente.)
	each: function (retorno de chamada, args) {
		retornar jQuery.each (this, callback, args);
	}

	ready: function (fn) {
		// Anexe os ouvintes
		jQuery.bindReady ();

		// Adicione o retorno de chamada
		readyList.done (fn);

		devolva isso;
	}

	eq: function (i) {
		retornar i === -1?
			this.slice (i):
			esta fatia (i, + i + 1);
	}

	primeiro: function () {
		retornar this.eq (0);
	}

	last: function () {
		retornar this.eq (-1);
	}

	slice: function () {
		retorne this.pushStack (slice.apply (this, argumentos),
			"fatia", fatia.call (argumentos) .join (","));
	}

	map: function (retorno de chamada) {
		retornar this.pushStack (jQuery.map (this, function (elem, i) {
			retornar callback.call (elem, i, elem);
		}));
	}

	end: function () {
		retorne this.prevObject || this.constructor (null);
	}

	// Apenas para uso interno.
	// Se comporta como o método de uma matriz, não como o método jQuery.
	empurre empurre,
	tipo: [] .sort,
	emenda: [] .splice
};

// Dê à função init o protótipo do jQuery para instanciação posterior
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function () {
	opções var, nome, src, cópia, copyIsArray, clone,
		alvo = argumentos [0] || {}
		i = 1
		length = argument.length,
		profundo = falso;

	// Lida com uma situação de cópia profunda
	if (typeof target === "boolean") {
		profundo = alvo;
		alvo = argumentos [1] || {};
		// pula o booleano e o destino
		i = 2;
	}

	// Manipula maiúsculas e minúsculas quando o destino é uma string ou algo assim
	if (typeof target! == "object" &&! jQuery.isFunction (target)) {
		target = {};
	}

	// estende o próprio jQuery se apenas um argumento é passado
	if (length === i) {
		target = this;
		--Eu;
	}

	para (; i <comprimento; i ++) {
		// Lide apenas com valores não nulos / indefinidos
		if ((opções = argumentos [i])! = nulo) {
			// Estende o objeto base
			para (nome nas opções) {
				src = destino [nome];
				cópia = opções [nome];

				// Impedir loop sem fim
				if (target === copy) {
					continuar;
				}

				// Recursa se estivermos mesclando objetos simples ou matrizes
				if (profundidade && cópia && (jQuery.isPlainObject (cópia) || (copyIsArray = jQuery.isArray (cópia)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = src && jQuery.isArray (src)? src: [];

					} outro {
						clone = src && jQuery.isPlainObject (src)? src: {};
					}

					// Nunca mova objetos originais, clone-os
					target [nome] = jQuery.extend (profundo, clone, copia);

				// Não introduza valores indefinidos
				} caso contrário, se (copiar! == indefinido) {
					alvo [nome] = cópia;
				}
			}
		}
	}

	// Retorna o objeto modificado
	meta de retorno;
};

jQuery.extend ({
	noConflict: function (deep) {
		if (window. $ === jQuery) {
			janela. $ = _ $;
		}

		if (deep && window.jQuery === jQuery) {
			window.jQuery = _jQuery;
		}

		retornar jQuery;
	}

	// O DOM está pronto para ser usado? Defina como true quando ocorrer.
	isReady: false,

	// Um ​​contador para rastrear quantos itens aguardar antes
	// o evento ready é acionado. Veja # 6781
	readyWait: 1,

	// Reter (ou liberar) o evento ready
	holdReady: function (hold) {
		se (mantenha) {
			jQuery.readyWait ++;
		} outro {
			jQuery.ready (true);
		}
	}

	// Identifica quando o DOM está pronto
	ready: function (espera) {
		// Uma retenção liberada ou um evento DOMready / load e ainda não está pronto
		if ((wait === true &&! - jQuery.readyWait) || (espera! == true &&! jQuery.isReady)) {
			// Verifique se o corpo existe, pelo menos, caso o IE fique um pouco zeloso (ticket 5443).
			if (! document.body) {
				retornar setTimeout (jQuery.ready, 1);
			}

			// Lembre-se de que o DOM está pronto
			jQuery.isReady = true;

			// Se um evento normal do DOM Ready for disparado, diminua e aguarde se necessário
			if (aguarde! == true && --jQuery.readyWait> 0) {
				Retorna;
			}

			// Se houver funções vinculadas, executar
			readyList.resolveWith (document, [jQuery]);

			// Dispara qualquer evento pronto vinculado
			if (jQuery.fn.trigger) {
				jQuery (documento) .trigger ("pronto") .unbind ("pronto");
			}
		}
	}

	bindReady: function () {
		if (readyList) {
			Retorna;
		}

		readyList = jQuery._Deferred ();

		// Captura de casos em que $ (document) .ready () é chamado após o
		// evento do navegador já ocorreu.
		if (document.readyState === "complete") {
			// Manuseie de forma assíncrona para permitir que os scripts atrasem a preparação
			retornar setTimeout (jQuery.ready, 1);
		}

		// Noites da Mozilla, Opera e webkit atualmente suportam este evento
		if (document.addEventListener) {
			// Use o retorno de chamada do evento útil
			document.addEventListener ("DOMContentLoaded", DOMContentLoaded, false);

			// Um ​​fallback para window.onload, que sempre funcionará
			window.addEventListener ("load", jQuery.ready, false);

		// Se o modelo de evento do IE for usado
		} se if (document.attachEvent) {
			// assegure o disparo antes da carga,
			// talvez atrasado, mas seguro também para iframes
			document.attachEvent ("onreadystatechange", DOMContentLoaded);

			// Um ​​fallback para window.onload, que sempre funcionará
			window.attachEvent ("onload", jQuery.ready);

			// Se o IE e não um quadro
			// verifica continuamente se o documento está pronto
			var nível superior = falso;

			tentar {
				nível superior = window.frameElement == null;
			} captura (e) {}

			if (document.documentElement.doScroll && toplevel) {
				doScrollCheck ();
			}
		}
	}

	// Veja test / unit / core.js para obter detalhes sobre o isFunction.
	// Desde a versão 1.3, métodos e funções DOM como alert
	// não é suportado. Eles retornam false no IE (# 2968).
	isFunction: function (obj) {
		retornar jQuery.type (obj) === "função";
	}

	isArray: Array.isArray || função (obj) {
		retornar jQuery.type (obj) === "array";
	}

	// Uma maneira grosseira de determinar se um objeto é uma janela
	isWindow: function (obj) {
		retornar obj && typeof obj === "objeto" && "setInterval" em obj;
	}

	isNaN: function (obj) {
		return obj == null || ! rdigit.test (obj) || isNaN (obj);
	}

	tipo: função (obj) {
		retornar obj == nulo?
			String (obj):
			class2type [toString.call (obj)] || "objeto";
	}

	isPlainObject: function (obj) {
		// Deve ser um objeto.
		// Por causa do IE, também precisamos verificar a presença da propriedade do construtor.
		// Verifique se os nós do DOM e os objetos da janela também não passam
		if (! obj || jQuery.type (obj)! == "objeto" || obj.nodeType || jQuery.isWindow (obj)) {
			retorna falso;
		}

		// A propriedade do construtor não deve ser Object
		if (obj.constructor &&
			! hasOwn.call (obj, "construtor") &&
			! hasOwn.call (obj.constructor.prototype, "isPrototypeOf")) {
			retorna falso;
		}

		// Próprias propriedades são enumeradas em primeiro lugar, para acelerar,
		// se o último for próprio, todas as propriedades serão próprias.

		chave var;
		para (digite obj) {}

		tecla de retorno === undefined || hasOwn.call (obj, chave);
	}

	isEmptyObject: function (obj) {
		for (nome da variável em obj) {
			retorna falso;
		}
		return true;
	}

	error: function (msg) {
		jogar msg;
	}

	parseJSON: function (data) {
		if (typeof data! == "string" ||! data) {
			return null;
		}

		// Verifique se o espaço em branco inicial / final foi removido (o IE não pode lidar com isso)
		data = jQuery.trim (dados);

		// Tentativa de analisar usando o analisador JSON nativo primeiro
		if (window.JSON && window.JSON.parse) {
			retornar window.JSON.parse (dados);
		}

		// Verifique se os dados recebidos são JSON reais
		// Lógica emprestada de http://json.org/json2.js
		if (rvalidchars.test (data.replace (rvalidescape, "@")
			.replace (rvalidtokens, "]")
			.replace (rvalidbraces, ""))) {

			return (new Function ("return" + data)) ();

		}
		jQuery.error ("JSON inválido:" + dados);
	}

	// Análise xml entre navegadores
	// (xml e tmp usado internamente)
	parseXML: function (dados, xml, tmp) {

		if (window.DOMParser) {// Padrão
			tmp = novo DOMParser ();
			xml = tmp.parseFromString (dados, "texto / xml");
		} mais {// IE
			xml = new ActiveXObject ("Microsoft.XMLDOM");
			xml.async = "false";
			xml.loadXML (dados);
		}

		tmp = xml.documentElement;

		if (! tmp ||! tmp.nodeName || tmp.nodeName === "parsererror") {
			jQuery.error ("XML inválido:" + dados);
		}

		retornar xml;
	}

	noop: function () {},

	// Avalia um script em um contexto global
	// Soluções alternativas baseadas em descobertas de Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function (data) {
		if (data && rnotwhite.test (data)) {
			// Usamos o execScript no Internet Explorer
			// Usamos uma função anônima para que o contexto seja janela
			// em vez de jQuery no Firefox
			(window.execScript || função (dados) {
				window ["eval"] .call (janela, dados);
			}) (dados);
		}
	}

	// Converte uma string tracejada em camelCased string;
	// Usado pelos módulos css e data
	camelCase: function (string) {
		retornar string.replace (rdashAlpha, fcamelCase);
	}

	nodeName: function (elem, nome) {
		retornar elem.nodeName && elem.nodeName.toUpperCase () === nome.toUpperCase ();
	}

	// args é apenas para uso interno
	each: function (object, callback, args) {
		nome da variável, i = 0,
			length = object.length,
			isObj = comprimento === indefinido || jQuery.isFunction (objeto);

		if (args) {
			if (isObj) {
				para (nome no objeto) {
					if (callback.apply (objeto [nome], args) === false) {
						quebrar;
					}
				}
			} outro {
				para (; i <comprimento;) {
					if (callback.apply (objeto [i ++], args) === false) {
						quebrar;
					}
				}
			}

		// Um ​​caso especial e rápido para o uso mais comum de cada
		} outro {
			if (isObj) {
				para (nome no objeto) {
					if (callback.call (objeto [nome], nome, objeto [nome]) === false) {
						quebrar;
					}
				}
			} outro {
				para (; i <comprimento;) {
					if (callback.call (objeto [i], i, objeto [i ++]) === false) {
						quebrar;
					}
				}
			}
		}

		retornar objeto;
	}

	// Use a função String.trim nativa sempre que possível
	trim: trim?
		função (texto) {
			retornar texto == nulo?
				"":
				trim.call (texto);
		}:

		// Caso contrário, use nossa própria funcionalidade de corte
		função (texto) {
			retornar texto == nulo?
				"":
				text.toString (). replace (trimLeft, "") .replace (trimRight, "");
		}

	// results é apenas para uso interno
	makeArray: function (matriz, resultados) {
		var ret = resultados || [];

		if (matriz! = nulo) {
			// A janela, strings (e funções) também têm 'length'
			// A verificação extra da função typeof é para evitar falhas
			// no Safari 2 (consulte: # 3039)
			// Lógica aprimorada para lidar com problemas de RegExp do Blackberry 4.7 # 6930
			var tipo = jQuery.type (matriz);

			if (array.length == null || tipo === "string" || tipo === "função" || tipo === "regexp" || jQuery.isWindow (array)) {
				push.call (ret, array);
			} outro {
				jQuery.merge (ret, array);
			}
		}

		return ret;
	}

	inArray: function (elem, array) {

		if (indexOf) {
			retornar indexOf.call (array, elem);
		}

		for (var i = 0, length = array.length; i <length; i ++) {
			if (matriz [i] === elem) {
				retornar i;
			}
		}

		retorno -1;
	}

	mesclar: função (primeiro, segundo) {
		var i = first.length,
			j = 0;

		if (typeof second.length === "number") {
			para (var l = segundo comprimento; j <l; j ++) {
				primeiro [i ++] = segundo [j];
			}

		} outro {
			while (segundo [j]! == indefinido) {
				primeiro [i ++] = segundo [j ++];
			}
		}

		first.length = i;

		retornar primeiro;
	}

	grep: function (elems, retorno de chamada, inv) {
		var ret = [], retVal;
		inv = !! inv;

		// Percorre a matriz, salvando apenas os itens
		// que passam na função validadora
		for (var i = 0, length = elems.length; i <length; i ++) {
			retVal = !! retorno de chamada (elems [i], i);
			if (inv! == retVal) {
				ret.push (elems [i]);
			}
		}

		return ret;
	}

	// arg é apenas para uso interno
	map: function (elems, callback, arg) {
		valor var, chave, ret = [],
			i = 0
			length = elems.length,
			// objetos jquery são tratados como matrizes
			isArray = elemento instância da jQuery || length! == undefined && typeof length === "number" && ((length> 0 && elems [0] && elems [length -1]) || length === 0 || jQuery.isArray (elems));

		// Percorre a matriz, traduzindo cada um dos itens para seus
		if (isArray) {
			para (; i <comprimento; i ++) {
				valor = retorno de chamada (elems [i], i, arg);

				if (valor! = nulo) {
					ret [comprimento comprimento] = valor;
				}
			}

		// Passa por todas as chaves do objeto,
		} outro {
			para (chave nos elems) {
				valor = retorno de chamada (elems [key], key, arg);

				if (valor! = nulo) {
					ret [comprimento comprimento] = valor;
				}
			}
		}

		// Achatar todas as matrizes aninhadas
		retornar ret.concat.apply ([], ret);
	}

	// Um ​​contador GUID global para objetos
	guia: 1,

	// Vincula uma função a um contexto, opcionalmente aplicando parcialmente qualquer
	// argumentos.
	proxy: function (fn, contexto) {
		if (typeof context === "string") {
			var tmp = fn [contexto];
			contexto = fn;
			fn = tmp;
		}

		// Verificação rápida para determinar se o destino é exigível, na especificação
		// isso gera um TypeError, mas retornaremos indefinidos.
		if (! jQuery.isFunction (fn)) {
			retornar indefinido;
		}

		// Ligação simulada
		var args = slice.call (argumentos, 2),
			proxy = function () {
				retornar fn.apply (contexto, args.concat (slice.call (argumentos)));
			};

		// Defina o guia do manipulador exclusivo para o mesmo do manipulador original, para que possa ser removido
		proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid ++;

		proxy de retorno;
	}

	// Método mutifuncional para obter e definir valores para uma coleção
	// O valor / s pode opcionalmente ser executado se for uma função
	access: function (elementos, chave, valor, exec, fn, pass) {
		var length = elems.length;

		// Configurando muitos atributos
		if (chave typeof === "objeto") {
			para (var k na chave) {
				jQuery.access (elems, k, chave [k], exec, fn, valor);
			}
			elems de retorno;
		}

		// Configurando um atributo
		if (valor! == indefinido) {
			// Opcionalmente, os valores das funções são executados se exec for true
			exec =! pass && exec && jQuery.isFunction (value);

			para (var i = 0; i <comprimento; i ++) {
				fn (elems [i], chave, exec? value.call (elems [i], i, fn (elems [i], chave)): valor, aprovação);
			}

			elems de retorno;
		}

		// Obtendo um atributo
		comprimento de retorno? fn (elementos [0], tecla): indefinido;
	}

	now: function () {
		return (new Date ()). getTime ();
	}

	// O uso do jQuery.browser é desaprovado.
	// Mais detalhes: http://docs.jquery.com/Utilities/jQuery.browser
	uaMatch: function (ua) {
		ua = ua.toLowerCase ();

		var match = rwebkit.exec (ua) ||
			ropera.exec (ua) ||
			rmsie.exec (ua) ||
			ua.indexOf ("compatible") <0 && rmozilla.exec (ua) ||
			[];

		retornar {navegador: corresponder [1] || "", versão: corresponder [2] || "0"};
	}

	sub função() {
		função jQuerySub (seletor, contexto) {
			retornar novo jQuerySub.fn.init (seletor, contexto);
		}
		jQuery.extend (true, jQuerySub, this);
		jQuerySub.superclass = this;
		jQuerySub.fn = jQuerySub.prototype = this ();
		jQuerySub.fn.constructor = jQuerySub;
		jQuerySub.sub = this.sub;
		jQuerySub.fn.init = função init (seletor, contexto) {
			if (context && context instanceof jQuery &&! (context instanceof jQuerySub)) {
				contexto = jQuerySub (contexto);
			}

			retornar jQuery.fn.init.call (este, seletor, contexto, rootjQuerySub);
		};
		jQuerySub.fn.init.prototype = jQuerySub.fn;
		var rootjQuerySub = jQuerySub (documento);
		return jQuerySub;
	}

	navegador: {}
});

// Preencher o mapa class2type
jQuery.each ("Boolean Number String Função Matriz Data RegExp Object" .split (""), function (i, name) {
	class2type ["[objeto" + nome + "]"] = nome.toLowerCase ();
});

browserMatch = jQuery.uaMatch (userAgent);
if (browserMatch.browser) {
	jQuery.browser [browserMatch.browser] = verdadeiro;
	jQuery.browser.version = browserMatch.version;
}

// Descontinuado, use jQuery.browser.webkit
if (jQuery.browser.webkit) {
	jQuery.browser.safari = true;
}

// O IE não combina espaços sem quebra com \ s
if (rnotwhite.test ("\ xA0")) {
	trimLeft = / ^ [\ s \ xA0] + /;
	trimRight = / [\ s \ xA0] + $ /;
}

// Todos os objetos jQuery devem apontar de volta para esses
rootjQuery = jQuery (documento);

// Funções de limpeza para o método pronto para documento
if (document.addEventListener) {
	DOMContentLoaded = function () {
		document.removeEventListener ("DOMContentLoaded", DOMContentLoaded, false);
		jQuery.ready ();
	};

} se if (document.attachEvent) {
	DOMContentLoaded = function () {
		// Verifique se o corpo existe, pelo menos, caso o IE fique um pouco zeloso (ticket 5443).
		if (document.readyState === "complete") {
			document.detachEvent ("onreadystatechange", DOMContentLoaded);
			jQuery.ready ();
		}
	};
}

// A verificação pronta do DOM para o Internet Explorer
função doScrollCheck () {
	if (jQuery.isReady) {
		Retorna;
	}

	tentar {
		// Se o IE for usado, use o truque de Diego Perini
		// http://javascript.nwbox.com/IEContentLoaded/
		document.documentElement.doScroll ("left");
	} captura (e) {
		setTimeout (doScrollCheck, 1);
		Retorna;
	}

	// e executa quaisquer funções em espera
	jQuery.ready ();
}

retornar jQuery;

}) ();


var // Métodos de promessa
	promessaMethods = "promessa falhada isResolved isRejected, em seguida, sempre canaliza" .split (""),
	// Referência estática para cortar
	sliceDeferred = []. fatia;

jQuery.extend ({
	// Crie um simples adiado (uma lista de retornos de chamada)
	_Deferido: function () {
		var // lista de retornos de chamada
			retornos de chamada = [],
			// armazenado [context, args]
			disparamos,
			// para evitar disparar quando já está fazendo isso
			disparo
			// sinaliza para saber se o adiado foi cancelado
			cancelado,
			// o diferido em si
			diferido = {

				// concluído (f1, f2, ...)
				done: function () {
					if (! cancelado) {
						var args = argumentos,
							Eu,
							comprimento,
							elem,
							tipo,
							_disparamos;
						se (demitido) {
							_fired = demitido;
							disparado = 0;
						}
						for (i = 0, length = args.length; i <length; i ++) {
							elem = args [i];
							tipo = jQuery.type (elem);
							if (type === "array") {
								adiado.done.apply (adiado, elem);
							} else if (digite === "função") {
								callbacks.push (elem);
							}
						}
						if (_fired) {
							deferred.resolveWith (_fired [0], _fired [1]);
						}
					}
					devolva isso;
				}

				// resolve com o contexto e os argumentos fornecidos
				resolveWith: function (contexto, argumentos) {
					if (! cancelado &&! disparado &&! disparando) {
						// verifique se os argumentos estão disponíveis (# 8421)
						args = args || [];
						disparo = 1;
						tentar {
							while (retornos de chamada [0]) {
								callbacks.shift (). apply (contexto, argumentos);
							}
						}
						finalmente {
							acionado = [contexto, argumentos];
							disparo = 0;
						}
					}
					devolva isso;
				}

				// resolva com isso como contexto e argumentos fornecidos
				resolve: function () {
					deferred.resolveWith (isto, argumentos);
					devolva isso;
				}

				// Este adiado foi resolvido?
				isResolved: function () {
					retornar !! (disparando || disparado);
				}

				// Cancelar
				cancel: function () {
					cancelado = 1;
					retornos de chamada = [];
					devolva isso;
				}
			};

		retorno diferido;
	}

	// Adiado completo (lista de dois retornos de chamada)
	Adiado: function (func) {
		var adiado = jQuery._Deferred (),
			failDeferred = jQuery._Deferred (),
			promessa;
		// Adiciona métodos errorDeferred, then e promete
		jQuery.extend (adiado, {
			then: function (doneCallbacks, failCallbacks) {
				deferred.done (doneCallbacks) .fail (failCallbacks);
				devolva isso;
			}
			always: function () {
				retornar deferred.done.apply (adiado, argumentos) .fail.apply (this, argument);
			}
			fail: failDeferred.done,
			rejectWith: failDeferred.resolveWith,
			rejeitar: failDeferred.resolve,
			isRejected: failDeferred.isResolved,
			pipe: function (fnDone, fnFail) {
				retornar jQuery.Deferred (função (newDefer) {
					jQuery.each ({
						done: [fnDone, "resolve"],
						falha: [fnFail, "rejeitar"]
					} função (manipulador, dados) {
						var fn = dados [0],
							ação = dados [1],
							devolvida;
						if (jQuery.isFunction (fn)) {
							adiado [manipulador] (function () {
								retornado = fn.apply (isto, argumentos);
								if (retornado && jQuery.isFunction (return.promise)) {
									return.promise (). then (newDefer.resolve, newDefer.reject);
								} outro {
									newDefer [ação] (retornado);
								}
							});
						} outro {
							adiado [manipulador] (newDefer [ação]);
						}
					});
				}).promessa();
			}
			// Receba uma promessa para este adiado
			// Se obj for fornecido, o aspecto da promessa será adicionado ao objeto
			promessa: função (obj) {
				if (obj == null) {
					if (promessa) {
						promessa de retorno;
					}
					promessa = obj = {};
				}
				var i = promessaMétodos.de comprimento;
				enquanto eu-- ) {
					obj [promessaMétodos [i]] = adiado [promessaMétodos [i]];
				}
				retornar obj;
			}
		});
		// Verifique se apenas uma lista de retorno de chamada será usada
		deferred.done (failDeferred.cancel) .fail (deferred.cancel);
		// Unexpose cancel
		delete deferred.cancel;
		// Chamada func, se houver
		if (func) {
			func.call (adiado, adiado);
		}
		retorno diferido;
	}

	// Auxiliar adiado
	when: function (firstParam) {
		var args = argumentos,
			i = 0
			length = args.length,
			count = comprimento,
			adiado = comprimento <= 1 && firstParam && jQuery.isFunction (firstParam.promise)?
				firstParam:
				jQuery.Deferred ();
		função resolveFunc (i) {
			função de retorno (valor) {
				args [i] = argument.length> 1? sliceDeferred.call (argumentos, 0): valor;
				if (! (--contagem)) {
					// Erro estranho no FF4:
					// Os valores alterados no objeto de argumentos às vezes acabam como valores indefinidos
					// fora do método $ .when. A clonagem do objeto em uma nova matriz resolve o problema
					deferred.resolveWith (adiado, sliceDeferred.call (args, 0));
				}
			};
		}
		if (comprimento> 1) {
			para (; i <comprimento; i ++) {
				if (args [i] && jQuery.isFunction (args [i] .promise)) {
					args [i] .promise (). then (resolveFunc (i), adiado.rejeitar);
				} outro {
					--contagem;
				}
			}
			if (! count) {
				deferred.resolveWith (adiado, args);
			}
		} else if (adiado! == firstParam) {
			deferred.resolveWith (adiado, comprimento? [firstParam]: []);
		}
		return deferred.promise ();
	}
});



jQuery.support = (function () {

	var div = document.createElement ("div"),
		documentElement = document.documentElement,
		todos,
		uma,
		selecione,
		optar,
		entrada,
		marginDiv,
		Apoio, suporte,
		fragmento,
		corpo,
		testElementParent,
		testElement,
		testElementStyle,
		tds,
		eventos,
		nome do evento,
		Eu,
		é suportado;

	// Testes preliminares
	div.setAttribute ("className", "t");
	div.innerHTML = "<link/><table> </table> <a href='/a' style='top:1px;float:left;opacity:.55;'> a </a> <tipo de entrada = 'caixa de seleção' /> ";

	all = div.getElementsByTagName ("*");
	a = div.getElementsByTagName ("a") [0];

	// Não é possível obter suporte básico de teste
	if (! all ||! all.length ||! a) {
		Retorna {};
	}

	// Primeiro lote de testes de suporte
	select = document.createElement ("select");
	opt = select.appendChild (document.createElement ("opção"));
	input = div.getElementsByTagName ("input") [0];

	support = {
		// O IE remove os espaços em branco à esquerda quando o .innerHTML é usado
		leaderWhitespace: (div.firstChild.nodeType === 3),

		// Verifique se os elementos do corpo não estão inseridos automaticamente
		// IE irá inseri-los em tabelas vazias
		tbody:! div.getElementsByTagName ("tbody") .length,

		// Certifique-se de que os elementos do link sejam serializados corretamente pelo innerHTML
		// Isso requer um elemento wrapper no IE
		htmlSerialize: !! div.getElementsByTagName ("link") .length,

		// Obtenha as informações de estilo de getAttribute
		// (o IE usa .cssText)
		style: /top/.test (a.getAttribute ("style"))),

		// Verifique se os URLs não são manipulados
		// (o IE normaliza por padrão)
		hrefNormalizado: (a.getAttribute ("href") === "/ a"),

		// Verifique se a opacidade do elemento existe
		// (o IE usa filtro)
		// Use uma regex para solucionar um problema do WebKit. Veja # 5145
		opacidade: /^0.55 $ /. test (a.style.opacidade),

		// Verificar a existência de flutuação de estilo
		// (o IE usa styleFloat em vez de cssFloat)
		cssFloat: !! a.style.cssFloat,

		// Certifique-se de que, se nenhum valor for especificado para uma caixa de seleção
		// que o padrão é "on".
		// (o WebKit assume o padrão "")
		checkOn: (input.value === "on"),

		// Verifique se uma opção selecionada por padrão tem uma propriedade selecionada em funcionamento.
		// (o WebKit padroniza como false em vez de true, também no IE, se estiver em um grupo de opções)
		optSelected: opt.selected,

		// Teste setAttribute na classe camelCase. Se funcionar, precisamos de attrFixes ao executar get / setAttribute (ie 6/7)
		getSetAttribute: div.className! == "t",

		// Será definido posteriormente
		submitBubbles: true,
		changeBubbles: true,
		focusinBubbles: false,
		deleteExpando: true,
		noCloneEvent: true,
		inlineBlockNeedsLayout: false,
		shrinkWrapBlocks: false,
		reliableMarginRight: true
	};

	// Verifique se o status verificado está corretamente clonado
	input.checked = true;
	support.noCloneChecked = input.cloneNode (true) .checked;

	// Verifique se as opções dentro das seleções desativadas não estão marcadas como desativadas
	// (o WebKit os marca como desativados)
	select.disabled = true;
	support.optDisabled =! opt.disabled;

	// Teste para ver se é possível excluir uma expando de um elemento
	// Falha no Internet Explorer
	tentar {
		excluir div.test;
	} captura (e) {
		support.deleteExpando = false;
	}

	if (! div.addEventListener && div.attachEvent && div.fireEvent) {
		div.attachEvent ("onclick", function () {
			// A clonagem de um nó não deve copiar sobre nenhum
			// manipuladores de eventos vinculados (o IE faz isso)
			support.noCloneEvent = false;
		});
		div.cloneNode (true) .fireEvent ("onclick");
	}

	// Verifique se um rádio mantém seu valor
	// depois de ser anexado ao DOM
	input = document.createElement ("input");
	input.value = "t";
	input.setAttribute ("type", "radio");
	support.radioValue = input.value === "t";

	input.setAttribute ("marcado", "marcado");
	div.appendChild (entrada);
	fragmento = document.createDocumentFragment ();
	fragment.appendChild (div.firstChild);

	// O WebKit não clona o estado verificado corretamente em fragmentos
	support.checkClone = fragment.cloneNode (true) .cloneNode (true) .lastChild.checked;

	div.innerHTML = "";

	// Descobrir se o modelo de caixa W3C funciona conforme o esperado
	div.style. largura = div. estilo.paddingLeft = "1 px";

	corpo = document.getElementsByTagName ("corpo") [0];
	// Usamos nosso próprio corpo invisível, a menos que o corpo já esteja presente
	// nesse caso, usamos uma div (# 9239)
	testElement = document.createElement (body? "div": "body");
	testElementStyle = {
		visibilidade: "oculto",
		largura: 0,
		altura: 0,
		borda: 0,
		margem: 0
	};
	if (body) {
		jQuery.extend (testElementStyle, {
			posição: "absoluto",
			esquerda: -1000,
			top: -1000
		});
	}
	para (i em testElementStyle) {
		testElement.style [i] = testElementStyle [i];
	}
	testElement.appendChild (div);
	testElementParent = body || documentElement;
	testElementParent.insertBefore (testElement, testElementParent.firstChild);

	// Verifique se uma caixa de seleção desconectada manterá sua marca marcada
	// valor true após anexado ao DOM (IE6 / 7)
	support.appendChecked = input.checked;

	support.boxModel = div.offsetWidth === 2;

	if ("zoom" em div.style) {
		// Verifique se os elementos no nível do bloco nativamente agem como bloco embutido
		// elementos ao definir sua exibição como 'inline' e fornecer
		// layout deles
		// (o IE <8 faz isso)
		div.style.display = "inline";
		div.style.zoom = 1;
		support.inlineBlockNeedsLayout = (div.offsetWidth === 2);

		// Verifique se os elementos com layout encolhem seus filhos
		// (o IE 6 faz isso)
		div.style.display = "";
		div.innerHTML = "<div style = 'width: 4px;'> </div>";
		support.shrinkWrapBlocks = (div.offsetWidth! == 2);
	}

	div.innerHTML = "<table> <tr> <td style = 'padding: 0; border: 0; display: none'> </td> <td> t </td> </tr> </table>" ;
	tds = div.getElementsByTagName ("td");

	// Verifique se as células da tabela ainda possuem offsetWidth / Height quando estão definidas
	// para exibir: none e ainda existem outras células da tabela visíveis em um
	// linha da tabela; Nesse caso, offsetWidth / Height não é confiável para uso quando
	// determinando se um elemento foi oculto diretamente usando
	// display: none (ainda é seguro usar compensações se um elemento pai for
	// oculto; use óculos de segurança e consulte o bug nº 4512 para obter mais informações).
	// (apenas o IE 8 falha neste teste)
	isSupported = (tds [0] .offsetHeight === 0);

	tds [0] .style.display = "";
	tds [1] .style.display = "nenhum";

	// Verifique se as células vazias da tabela ainda têm offsetWidth / Height
	// (IE <8 falha neste teste)
	support.reliableHiddenOffsets = isSupported && (tds [0] .offsetHeight === 0);
	div.innerHTML = "";

	// Verifique se div com largura explícita e sem margem direita incorretamente
	// obtém a margem direita calculada com base na largura do contêiner. Para mais
	// informações, veja o bug # 3333
	// Falha no WebKit antes das noites de fevereiro de 2011
	// Bug do WebKit 13343 - getComputedStyle retorna um valor incorreto para margem-direita
	if (document.defaultView && document.defaultView.getComputedStyle) {
		marginDiv = document.createElement ("div");
		marginDiv.style.width = "0";
		marginDiv.style.marginRight = "0";
		div.appendChild (marginDiv);
		support.reliableMarginRight =
			(parseInt ((document.defaultView.getComputedStyle (marginDiv, null) || {marginRight: 0}) .marginRight, 10) || 0) === 0;
	}

	// Remova o elemento do corpo que adicionamos
	testElement.innerHTML = "";
	testElementParent.removeChild (testElement);

	// Técnica de Juriy Zaytsev
	// http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
	// Só nos preocupamos com o caso em que sistemas de eventos não padrão
	// são usados, nomeadamente no IE. Curto-circuito aqui nos ajuda a
	// evita uma chamada de avaliação (em setAttribute) que pode causar o CSP
	// para dar errado. Veja: https://developer.mozilla.org/en/Security/CSP
	if (div.attachEvent) {
		para (i em {
			enviar: 1,
			mudança: 1,
			focusin: 1
		}) {
			eventName = "on" + i;
			isSupported = (eventName em div);
			if (! isSupported) {
				div.setAttribute (eventName, "return;");
				isSupported = (tipo de div [eventName] === "função");
			}
			suporte [i + "Bubbles"] = isSupported;
		}
	}

	// Elementos conectados nulos para evitar vazamentos no IE
	testElement = fragmento = select = opt = body = marginDiv = div = input = null;

	suporte de retorno;
}) ();

// Acompanhe boxModel
jQuery.boxModel = jQuery.support.boxModel;




var rbrace = /^(?:\{.*\}|\[.*\¯)$/,
	rmultiDash = / ([az]) ([AZ]) / g;

jQuery.extend ({
	cache: {},

	// Por favor, use com cautela
	uuid: 0,

	// Exclusivo para cada cópia do jQuery na página
	// Sem dígitos removidos para corresponder a rinlinejQuery
	expando: "jQuery" + (jQuery.fn.jquery + Math.random ()) .replace (/ \ D / g, ""),

	// Os seguintes elementos lançam exceções incontornáveis ​​se você
	// tenta adicionar propriedades expando a eles.
	noData: {
		"incorporar": verdadeiro,
		// Banir todos os objetos, exceto o Flash (que manipula expandos)
		"objeto": "clsid: D27CDB6E-AE6D-11cf-96B8-444553540000",
		"applet": true
	}

	hasData: function (elem) {
		elem = elem.nodeType? jQuery.cache [elem [jQuery.expando]]: elem [jQuery.expando];

		retornar !! elem &&! isEmptyDataObject (elem);
	}

	data: function (elem, nome, dados, pvt / * Somente para uso interno * /) {
		if (! jQuery.acceptData (elem)) {
			Retorna;
		}

		var internalKey = jQuery.expando, getByName = typeof name === "string", thisCache,

			// Temos que lidar com nós DOM e objetos JS de maneira diferente porque o IE6-7
			// não é possível fazer referências de objetos do GC corretamente no limite do DOM-JS
			isNode = elem.nodeType,

			// Apenas os nós DOM precisam do cache jQuery global; Os dados do objeto JS são
			// anexado diretamente ao objeto para que o GC possa ocorrer automaticamente
			cache = isNode? jQuery.cache: elem,

			// Apenas definir um ID para objetos JS se seu cache já existir permitir
			// o código para atalho no mesmo caminho que um nó DOM sem cache
			id = isNode? elem [jQuery.expando]: elem [jQuery.expando] && jQuery.expando;

		// Evite fazer mais trabalho do que precisamos ao tentar obter dados em um
		// objeto que não possui dados
		if ((! id || (pvt && id &&! cache [id] [internalKey])) && getByName && data === indefinido) {
			Retorna;
		}

		if (! id) {
			// Apenas os nós DOM precisam de um novo ID exclusivo para cada elemento, pois seus dados
			// acaba no cache global
			if (isNode) {
				elem [jQuery.expando] = id = ++ jQuery.uuid;
			} outro {
				id = jQuery.expando;
			}
		}

		if (! cache [id]) {
			cache [id] = {};

			// TODO: Este é um hack para 1,5 SOMENTE. Evita a exposição do jQuery
			// metadados em objetos JS simples quando o objeto é serializado usando
			// JSON.stringify
			if (! isNode) {
				cache [id] .toJSON = jQuery.noop;
			}
		}

		// Um ​​objeto pode ser passado para jQuery.data em vez de um par de chave / valor; isso fica
		// superficial copiado para o cache existente
		if (nome do tipo === "objeto" || nome do tipo === "função") {
			if (pvt) {
				cache [id] [internalKey] = jQuery.extend (cache [id] [internalKey], nome);
			} outro {
				cache [id] = jQuery.extend (cache [id], nome);
			}
		}

		thisCache = cache [id];

		// Os dados internos do jQuery são armazenados em um objeto separado dentro dos dados do objeto.
		// cache para evitar colisões de chave entre dados internos e dados definidos pelo usuário
		// data
		if (pvt) {
			if (! thisCache [internalKey]) {
				thisCache [internalKey] = {};
			}

			thisCache = thisCache [internalKey];
		}

		if (data! == indefinido) {
			thisCache [jQuery.camelCase (name)] = dados;
		}

		// TODO: Este é um hack para 1,5 SOMENTE. Será removido no 1.6. Os usuários devem
		// não tente inspecionar o objeto de eventos internos usando jQuery.data, pois isso
		// objeto de dados interno não está documentado e está sujeito a alterações.
		if (name === "events" &&! thisCache [name]) {
			retorne thisCache [internalKey] && thisCache [internalKey] .events;
		}

		retornar getByName? 
			// Verifique os nomes de propriedades de dados convertidos em camelo e não convertidos
			thisCache [jQuery.camelCase (nome)] || thisCache [nome]:
			thisCache;
	}

	removeData: function (elem, nome, pvt / * Somente Uso Interno * /) {
		if (! jQuery.acceptData (elem)) {
			Retorna;
		}

		var internalKey = jQuery.expando, isNode = elem.nodeType,

			// Veja jQuery.data para obter mais informações
			cache = isNode? jQuery.cache: elem,

			// Veja jQuery.data para obter mais informações
			id = isNode? elem [jQuery.expando]: jQuery.expando;

		// Se já não houver entrada de cache para este objeto, não haverá
		// objetivo em continuar
		if (! cache [id]) {
			Retorna;
		}

		if (nome) {
			var thisCache = pvt? cache [id] [internalKey]: cache [id];

			if (thisCache) {
				exclua thisCache [nome];

				// Se ainda não houver dados no cache, queremos continuar
				// e deixe o próprio objeto de cache ser destruído
				if (! isEmptyDataObject (thisCache)) {
					Retorna;
				}
			}
		}

		// Veja jQuery.data para obter mais informações
		if (pvt) {
			excluir cache [id] [internalKey];

			// Não destrua o cache pai, a menos que o objeto de dados interno
			// tinha sido a única coisa que restava nele
			if (! isEmptyDataObject (cache [id])) {
				Retorna;
			}
		}

		var internalCache = cache [id] [internalKey];

		// Os navegadores que falham na exclusão ao excluir também recusam excluir os expansos
		// a janela, mas permitirá isso em todos os outros objetos JS; outros navegadores
		// não me importo
		if (jQuery.support.deleteExpando || cache! = window) {
			excluir cache [id];
		} outro {
			cache [id] = nulo;
		}

		// Destruímos todo o cache do usuário de uma só vez, porque é mais rápido do que
		// iterando cada chave, mas precisamos continuar persistindo
		// dados, se existirem
		if (internalCache) {
			cache [id] = {};
			// TODO: Este é um hack para 1,5 SOMENTE. Evita a exposição do jQuery
			// metadados em objetos JS simples quando o objeto é serializado usando
			// JSON.stringify
			if (! isNode) {
				cache [id] .toJSON = jQuery.noop;
			}

			cache [id] [internalKey] = internalCache;

		// Caso contrário, precisamos eliminar o expando no nó para evitar
		// pesquisas falsas no cache para entradas que não existem mais
		} senão se (isNode) {
			// O IE não permite excluir propriedades expando dos nós,
			// nem possui uma função removeAttribute nos nós do documento;
			// devemos lidar com todos esses casos
			if (jQuery.support.deleteExpando) {
				excluir elem [jQuery.expando];
			} mais se (elem.removeAttribute) {
				elem.removeAttribute (jQuery.expando);
			} outro {
				elem [jQuery.expando] = nulo;
			}
		}
	}

	// Apenas para uso interno.
	_dados: função (elem, nome, dados) {
		retornar jQuery.data (elem, nome, dados, verdadeiro);
	}

	// Um ​​método para determinar se um nó DOM pode manipular os dados expando
	acceptData: function (elem) {
		if (elem.nodeName) {
			var match = jQuery.noData [elem.nodeName.toLowerCase ()];

			if (match) {
				return! (match === true || elem.getAttribute ("classid")! == match);
			}
		}

		return true;
	}
});

jQuery.fn.extend ({
	data: function (chave, valor) {
		dados var = nulo;

		if (chave typeof === "indefinida") {
			if (this.length) {
				data = jQuery.data (este [0]);

				if (este [0] .nodeType === 1) {
			    var attr = this [0] .atributos, nome;
					para (var i = 0, l = comprimento do atributo; i <l; i ++) {
						nome = attr [i] .name;

						if (name.indexOf ("data-") === 0) {
							nome = jQuery.camelCase (nome.substring (5));

							dataAttr (este [0], nome, dados [nome]);
						}
					}
				}
			}

			retornar dados;

		} else if (chave typeof === "objeto") {
			retorne this.each (function () {
				jQuery.data (essa chave);
			});
		}

		var partes = key.split (".");
		partes [1] = partes [1]? "." + partes [1]: "";

		if (value === undefined) {
			data = this.triggerHandler ("getData" + partes [1] + "!", [partes [0]]);

			// Tente buscar primeiro os dados armazenados internamente
			if (data === indefinido && this.length) {
				data = jQuery.data (esta [0], chave);
				data = dataAttr (este [0], chave, dados);
			}

			retornar dados === undefined && parts [1]?
				this.data (partes [0]):
				dados;

		} outro {
			retorne this.each (function () {
				var $ this = jQuery (isto),
					args = [partes [0], valor];

				$ this.triggerHandler ("setData" + partes [1] + "!", args);
				jQuery.data (este, chave, valor);
				$ this.triggerHandler ("changeData" + partes [1] + "!", args);
			});
		}
	}

	removeData: function (key) {
		retorne this.each (function () {
			jQuery.removeData (essa chave);
		});
	}
});

função dataAttr (elem, chave, dados) {
	// Se nada foi encontrado internamente, tente buscar qualquer
	// dados do atributo HTML5 data- *
	if (data === indefinido && elem.nodeType === 1) {
		var name = "data-" + key.replace (rmultiDash, "$ 1- $ 2") .toLowerCase ();

		data = elem.getAttribute (nome);

		if (typeof data === "string") {
			tentar {
				data = data === "verdadeiro"? verdade :
				data === "falso"? false:
				data === "nulo"? nulo :
				! jQuery.isNaN (dados)? parseFloat (dados):
					rbrace.test (dados)? jQuery.parseJSON (dados):
					dados;
			} captura (e) {}

			// Certifique-se de definir os dados para que não sejam alterados posteriormente
			jQuery.data (elem, chave, dados);

		} outro {
			dados = indefinidos;
		}
	}

	retornar dados;
}

// TODO: Este é um hack para 1.5 SOMENTE para permitir objetos com um único toJSON
// propriedade a ser considerada objetos vazios; esta propriedade sempre existe em
// para garantir que JSON.stringify não exponha metadados internos
função isEmptyDataObject (obj) {
	for (nome da variável em obj) {
		if (nome! == "toJSON") {
			retorna falso;
		}
	}

	return true;
}




função handleQueueMarkDefer (elem, tipo, src) {
	var deferDataKey = tipo + "adiar",
		queueDataKey = tipo + "fila",
		markDataKey = tipo + "marca",
		adiar = jQuery.data (elem, deferDataKey, indefinido, verdadeiro);
	if (adie &&
		(src === "fila" ||! jQuery.data (elem, queueDataKey, indefinido, verdadeiro)) &&
		(src === "marca" ||! jQuery.data (elem, markDataKey, indefinido, verdadeiro))) {
		// Dê espaço para que os retornos de chamada codificados sejam acionados primeiro
		// e, eventualmente, marca / enfileira outra coisa no elemento
		setTimeout (function () {
			if (! jQuery.data (elem, queueDataKey, undefined, true) &&
				! jQuery.data (elem, markDataKey, indefinido, verdadeiro)) {
				jQuery.removeData (elem, deferDataKey, true);
				defer.resolve ();
			}
		} 0);
	}
}

jQuery.extend ({

	_mark: function (elem, tipo) {
		if (elem) {
			type = (tipo || "fx") + "marca";
			jQuery.data (elem, tipo, (jQuery.data (elem, tipo, indefinido, verdadeiro) || 0) + 1, verdadeiro));
		}
	}

	_unmark: function (force, elem, type) {
		if (force! == true) {
			tipo = elem;
			elem = força;
			force = false;
		}
		if (elem) {
			tipo = tipo || "fx";
			chave var = tipo + "marca",
				contagem = força? 0: ((jQuery.data (elem, chave, indefinido, verdadeiro) || 1) - 1);
			if (count) {
				jQuery.data (elem, chave, contagem, verdadeiro);
			} outro {
				jQuery.removeData (elem, chave, verdadeiro);
				handleQueueMarkDefer (elem, tipo, "marca");
			}
		}
	}

	fila: função (elem, tipo, dados) {
		if (elem) {
			type = (tipo || "fx") + "fila";
			var q = jQuery.data (elem, tipo, indefinido, verdadeiro);
			// Acelere a remoção da fila saindo rapidamente se for apenas uma pesquisa
			if (dados) {
				if (! q || jQuery.isArray (dados)) {
					q = jQuery.data (elem, tipo, jQuery.makeArray (dados), verdadeiro);
				} outro {
					q.push (dados);
				}
			}
			retornar q || [];
		}
	}

	desenfileirar: função (elem, tipo) {
		tipo = tipo || "fx";

		var queue = jQuery.queue (elem, tipo),
			fn = fila.shift (),
			adiar;

		// Se a fila fx estiver na fila, remova sempre o progresso sentinela
		if (fn === "inprogress") {
			fn = fila.shift ();
		}

		se (fn) {
			// Adicione um sentinel de progresso para impedir que a fila fx seja
			// desenfileirado automaticamente
			if (digite === "fx") {
				fila.unshift ("inprogress");
			}

			fn.call (elem, function () {
				jQuery.dequeue (elem, tipo);
			});
		}

		if (! queue.length) {
			jQuery.removeData (elem, tipo + "fila", true);
			handleQueueMarkDefer (elem, tipo, "fila");
		}
	}
});

jQuery.fn.extend ({
	fila: função (tipo, dados) {
		if (typeof type! == "string") {
			data = tipo;
			type = "fx";
		}

		if (data === indefinido) {
			retornar jQuery.queue (este [0], tipo);
		}
		retorne this.each (function () {
			var fila = jQuery.queue (este, tipo, dados);

			if (digite === "fx" && fila [0]! == "inprogress") {
				jQuery.dequeue (esse tipo);
			}
		});
	}
	desenfileirar: função (tipo) {
		retorne this.each (function () {
			jQuery.dequeue (esse tipo);
		});
	}
	// Baseado no plugin por Clint Helfers, com permissão.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function (hora, tipo) {
		time = jQuery.fx? jQuery.fx.speeds [time] || tempo: tempo;
		tipo = tipo || "fx";

		retorne this.queue (tipo, função () {
			var elem = isto;
			setTimeout (function () {
				jQuery.dequeue (elem, tipo);
			}, Tempo );
		});
	}
	clearQueue: function (type) {
		retorne this.queue (digite || "fx", []);
	}
	// Obter uma promessa resolvida quando filas de um determinado tipo
	// são esvaziados (fx é o tipo por padrão)
	promessa: função (tipo, objeto) {
		if (typeof type! == "string") {
			objeto = tipo;
			tipo = indefinido;
		}
		tipo = tipo || "fx";
		var defer = jQuery.Deferred (),
			elements = this,
			i = elements.length,
			count = 1,
			deferDataKey = tipo + "adiar",
			queueDataKey = tipo + "fila",
			markDataKey = tipo + "marca",
			tmp;
		função resolve () {
			if (! (--contagem)) {
				defer.resolveWith (elementos, [elementos]);
			}
		}
		enquanto eu-- ) {
			if ((tmp = jQuery.data (elementos [i], deferDataKey, indefinido, verdadeiro) ||
					(jQuery.data (elementos [i], queueDataKey, indefinido, verdadeiro) ||
						jQuery.data (elementos [i], markDataKey, indefinido, verdadeiro)) &&
					jQuery.data (elementos [i], deferDataKey, jQuery._Deferred (), true))) {
				count ++;
				tmp.done (resolver);
			}
		}
		resolver();
		retornar defer.promise ();
	}
});




var rclass = / [\ n \ t \ r] / g,
	rspace = / \ s + /,
	retorno = / \ r / g,
	rtype = / ^ (?: botão | entrada) $ / i,
	rfocusable = / ^ (?: botão | entrada | objeto | selecione | área de texto) $ / i,
	rclickable = / ^ a (?: rea)? $ / i,
	rbooleano = / ^ (?: autofoco | autoplay | assíncrono | verificado | controles | adiar | desabilitado | oculto | loop | múltiplo | aberto | somente leitura | obrigatório | escopo | selecionado) $ / i,
	rinvalidChar = / \: | ^ em /,
	formHook, boolHook;

jQuery.fn.extend ({
	attr: função (nome, valor) {
		retornar jQuery.access (nome, valor, true, jQuery.attr);
	}

	removeAttr: function (name) {
		retorne this.each (function () {
			jQuery.removeAttr (esse nome);
		});
	}
	
	prop: function (nome, valor) {
		retornar jQuery.access (nome, valor, true, jQuery.prop);
	}
	
	removeProp: function (name) {
		nome = jQuery.propFix [nome] || nome;
		retorne this.each (function () {
			// try / catch lida com casos em que o IE fica impedido (como remover uma propriedade na janela)
			tentar {
				this [name] = indefinido;
				exclua este [nome];
			} captura (e) {}
		});
	}

	addClass: function (value) {
		var classNames, i, l, elem,
			setClass, c, cl;

		if (jQuery.isFunction (value)) {
			retorne this.each (function (j) {
				jQuery (this) .addClass (value.call (this, j, this.className));
			});
		}

		if (value && typeof value === "string") {
			classNames = value.split (rspace);

			para (i = 0, l = this.length; i <l; i ++) {
				elem = isto [i];

				if (elem.nodeType === 1) {
					if (! elem.className && classNames.length === 1) {
						elem.className = valor;

					} outro {
						setClass = "" + elem.className + "";

						for (c = 0, cl = classNames.length; c <cl; c ++) {
							if (! ~ setClass.indexOf ("" + classNames [c] + "")) {
								setClass + = classNames [c] + "";
							}
						}
						elem.className = jQuery.trim (setClass);
					}
				}
			}
		}

		devolva isso;
	}

	removeClass: function (value) {
		var classNames, i, l, elem, className, c, cl;

		if (jQuery.isFunction (value)) {
			retorne this.each (function (j) {
				jQuery (this) .removeClass (value.call (this, j, this.className));
			});
		}

		if ((valor && tipo de valor === "string") || valor === indefinido) {
			classNames = (valor || "") .split (rspace);

			para (i = 0, l = this.length; i <l; i ++) {
				elem = isto [i];

				if (elem.nodeType === 1 && elem.className) {
					if (value) {
						className = ("" + elem.className + ""). substitua (rclass, "");
						for (c = 0, cl = classNames.length; c <cl; c ++) {
							className = className.replace ("" + classNames [c] + "", "");
						}
						elem.className = jQuery.trim (className);

					} outro {
						elem.className = "";
					}
				}
			}
		}

		devolva isso;
	}

	toggleClass: function (valor, stateVal) {
		var type = typeof valor,
			isBool = typeof stateVal === "booleano";

		if (jQuery.isFunction (value)) {
			retorne this.each (function (i) {
				jQuery (this) .toggleClass (value.call (this, i, this.className, stateVal), stateVal);
			});
		}

		retorne this.each (function () {
			if (type === "string") {
				// alterna nomes de classes individuais
				var className,
					i = 0
					self = jQuery (isso),
					state = stateVal,
					classNames = value.split (rspace);

				while ((className = classNames [i ++])) {
					// verifica cada className dado, lista separada por espaço
					state = isBool? estado:! self.hasClass (className);
					auto [estado? "addClass": "removeClass"] (className);
				}

			} else if (tipo === "indefinido" || tipo === "booleano") {
				if (this.className) {
					// armazena className se definido
					jQuery._data (this, "__className__", this.className);
				}

				// alterna todo o className
				this.className = this.className || valor === falso? "": jQuery._data (este, "__className__") || "";
			}
		});
	}

	hasClass: function (seletor) {
		var className = "" + seletor + "";
		for (var i = 0, l = this.length; i <l; i ++) {
			if (("" + this [i] .className + ""). substitua (rclass, "") .indexOf (className)> -1) {
				return true;
			}
		}

		retorna falso;
	}

	val: função (valor) {
		ganchos var, ret,
			elem = este [0];
		
		if (! argument.length) {
			if (elem) {
				hooks = jQuery.valHooks [elem.nodeName.toLowerCase ()] || jQuery.valHooks [elem.type];

				if (hooks && "get" nos hooks && (ret = hooks.get (elem, "value"))! == indefinido) {
					return ret;
				}

				ret = elem.value;

				retornar typeof ret === "string"? 
					// manipula casos de string mais comuns
					ret.replace (retorno, ""): 
					// manipula casos em que o valor é nulo / indefinido ou número
					ret == null? "": ret;
			}

			retornar indefinido;
		}

		var isFunction = jQuery.isFunction (valor);

		retorne this.each (function (i) {
			var self = jQuery (isto), val;

			if (this.nodeType! == 1) {
				Retorna;
			}

			if (isFunction) {
				val = value.call (isto, i, self.val ());
			} outro {
				val = valor;
			}

			// Trate nulo / indefinido como ""; converter números em string
			if (val == null) {
				val = "";
			} else if (typeof val === "number") {
				val + = "";
			} else if (jQuery.isArray (val)) {
				val = jQuery.map (val, função (valor) {
					valor de retorno == nulo? "": valor + "";
				});
			}

			hooks = jQuery.valHooks [this.nodeName.toLowerCase ()] || jQuery.valHooks [this.type];

			// Se set retorna indefinido, volte à configuração normal
			if (! hooks ||! ("set" em hooks) || hooks.set (this, val, "value") === indefinido) {
				this.value = val;
			}
		});
	}
});

jQuery.extend ({
	valHooks: {
		opção: {
			get: function (elem) {
				// attribute.value é indefinido no Blackberry 4.7, mas
				// usa .value. Veja # 6932
				var val = elem.attributes.value;
				return! val || val.specified? elem.value: elem.text;
			}
		}
		selecione: {
			get: function (elem) {
				valor var,
					index = elem.selectedIndex,
					valores = [],
					opções = elem.options,
					one = elem.type === "selecione um";

				// Nada foi selecionado
				if (índice <0) {
					return null;
				}

				// Passa por todas as opções selecionadas
				para (var i = um? índice: 0, max = um? índice + 1: options.length; i <max; i ++) {
					var opção = opções [i];

					// Não retorne opções desabilitadas ou em um grupo de opções desabilitado
					if (option.selected && (jQuery.support.optDisabled?! option.disabled: option.getAttribute ("disabled") === null))
							(! option.parentNode.disabled ||! jQuery.nodeName (option.parentNode, "optgroup"))) {

						// Obtenha o valor específico para a opção
						valor = jQuery (opção) .val ();

						// Não precisamos de uma matriz para uma seleção
						se um ) {
							valor de retorno;
						}

						// Multi-Selects retorna uma matriz
						values.push (valor);
					}
				}

				// Correção do bug # 2551 - select.val () quebrado no IE após form.reset ()
				if (um &&! values.length && options.length) {
					retornar jQuery (opções [index]) .val ();
				}

				retornar valores;
			}

			set: function (elem, valor) {
				valores var = jQuery.makeArray (valor);

				jQuery (elem) .find ("opção"). each (function () {
					this.selected = jQuery.inArray (jQuery (this) .val (), valores)> = 0;
				});

				if (! values.length) {
					elem.selectedIndex = -1;
				}
				retornar valores;
			}
		}
	}

	attrFn: {
		val: true,
		css: verdadeiro,
		html: true,
		texto: verdadeiro,
		data: true,
		width: true,
		height: true,
		offset: true
	}
	
	attrFix: {
		// Sempre normalize para garantir o uso do gancho
		tabindex: "tabIndex"
	}
	
	attr: função (elem, nome, valor, passagem) {
		var nType = elem.nodeType;
		
		// não obtém / define atributos nos nós de texto, comentário e atributo
		if (! elem || nType === 3 || nType === 8 || nType === 2) {
			retornar indefinido;
		}

		if (passe && name em jQuery.attrFn) {
			retornar jQuery (elem) [nome] (valor);
		}

		// Fallback para prop quando atributos não são suportados
		if (! ("getAttribute" no elem)) {
			retornar jQuery.prop (elem, nome, valor);
		}

		var ret, ganchos,
			notxml = nType! == 1 || ! jQuery.isXMLDoc (elem);

		// Normalize o nome, se necessário
		if (notxml) {
			nome = jQuery.attrFix [nome] || nome;

			hooks = jQuery.attrHooks [nome];

			if (! hooks) {
				// Use boolHook para atributos booleanos
				if (rboolean.test (nome)) {

					hooks = boolHook;

				// Use formHook para formulários e se o nome contiver certos caracteres
				} else if (formHook && name! == "className" &&
					(jQuery.nodeName (elem, "formulário") || rinvalidChar.test (nome))) {

					hooks = formHook;
				}
			}
		}

		if (valor! == indefinido) {

			if (value === null) {
				jQuery.removeAttr (elem, nome);
				retornar indefinido;

			} caso contrário, se (hooks && "set" nos hooks && notxml && (ret = hooks.set (elem, valor, nome))!! == undefined) {
				return ret;

			} outro {
				elem.setAttribute (nome, "" + valor);
				valor de retorno;
			}

		} caso contrário, se (hooks && "get" em hooks && notxml && (ret = hooks.get (elem, nome))! == null) {
			return ret;

		} outro {

			ret = elem.getAttribute (nome);

			// Atributos inexistentes retornam nulo, normalizamos para indefinido
			retornar ret === nulo?
				Indefinido :
				ret;
		}
	}

	removeAttr: function (elem, nome) {
		var propName;
		if (elem.nodeType === 1) {
			nome = jQuery.attrFix [nome] || nome;
		
			if (jQuery.support.getSetAttribute) {
				// Use removeAttribute em navegadores compatíveis
				elem.removeAttribute (nome);
			} outro {
				jQuery.attr (elem, nome, "");
				elem.removeAttributeNode (elem.getAttributeNode (nome));
			}

			// Defina a propriedade correspondente como false para atributos booleanos
			if (rboolean.test (nome) && (propName = jQuery.propFix [nome] || nome) no elem) {
				elem [propName] = false;
			}
		}
	}

	attrHooks: {
		tipo: {
			set: function (elem, valor) {
				// Não podemos permitir que a propriedade type seja alterada (pois causa problemas no IE)
				if (rtype.test (elem.nodeName) && elem.parentNode) {
					jQuery.error ("a propriedade type não pode ser alterada");
				} else if (! jQuery.support.radioValue && value === "radio" && jQuery.nodeName (elem, "input")) {
					// Configurando o tipo em um botão de opção após o valor redefinir o valor no IE6-9
					// Redefine o valor para o padrão, caso o tipo seja definido após o valor
					// Isto é para criação de elemento
					var val = elem.value;
					elem.setAttribute ("tipo", valor);
					if (val) {
						elem.value = val;
					}
					valor de retorno;
				}
			}
		}
		tabIndex: {
			get: function (elem) {
				// elem.tabIndex nem sempre retorna o valor correto quando não foi definido explicitamente
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode ("tabIndex");

				retornar attributeNode && attributeNode.specified?
					parseInt (attributeNode.value, 10):
					rfocusable.test (elem.nodeName) || rclickable.test (elem.nodeName) && elem.href?
						0:
						Indefinido;
			}
		}
		// Use a propriedade value para back compat
		// Use o formHook para elementos de botão no IE6 / 7 (# 1954)
		valor: {
			get: function (elem, nome) {
				if (formHook && jQuery.nodeName (elem, "button")) {
					retornar formHook.get (elem, nome);
				}
				retornar nome em elem?
					elem.value:
					nulo;
			}
			set: function (elem, valor, nome) {
				if (formHook && jQuery.nodeName (elem, "button")) {
					retornar formHook.set (elem, valor, nome);
				}
				// Não retorna para que setAttribute também seja usado
				elem.value = valor;
			}
		}
	}

	propFix: {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellpacing: "cellSpacing",
		cellpadding: "cellPadding",
		linespan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	}
	
	prop: function (elem, nome, valor) {
		var nType = elem.nodeType;

		// não obtém / define propriedades nos nós de texto, comentário e atributo
		if (! elem || nType === 3 || nType === 8 || nType === 2) {
			retornar indefinido;
		}

		var ret, ganchos,
			notxml = nType! == 1 || ! jQuery.isXMLDoc (elem);

		if (notxml) {
			// Corrija o nome e anexe ganchos
			nome = jQuery.propFix [nome] || nome;
			hooks = jQuery.propHooks [nome];
		}

		if (valor! == indefinido) {
			if (hooks && "set" nos hooks && (ret = hooks.set (elem, valor, nome))! == indefinido) {
				return ret;

			} outro {
				return (elem [nome] = valor);
			}

		} outro {
			if (hooks && "get" em hooks && (ret = hooks.get (elem, nome))! == indefinido) {
				return ret;

			} outro {
				return elem [nome];
			}
		}
	}
	
	propHooks: {}
});

// Gancho para atributos booleanos
boolHook = {
	get: function (elem, nome) {
		// Alinha os atributos booleanos às propriedades correspondentes
		retornar jQuery.prop (elem, nome)?
			name.toLowerCase ():
			Indefinido;
	}
	set: function (elem, valor, nome) {
		var propName;
		if (value === false) {
			// Remove atributos booleanos quando definido como false
			jQuery.removeAttr (elem, nome);
		} outro {
			// o valor é verdadeiro, pois sabemos que, neste momento, é do tipo booleano e não falso
			// Defina atributos booleanos com o mesmo nome e defina a propriedade DOM
			propName = jQuery.propFix [nome] || nome;
			if (propName no elem) {
				// Defina apenas o IDL especificamente se ele já existir no elemento
				elem [propName] = verdadeiro;
			}

			elem.setAttribute (name, name.toLowerCase ());
		}
		nome de retorno;
	}
};

// O IE6 / 7 não oferece suporte à obtenção / configuração de alguns atributos com get / setAttribute
if (! jQuery.support.getSetAttribute) {

	// propFix é mais abrangente e contém todas as correções
	jQuery.attrFix = jQuery.propFix;
	
	// Use isso para qualquer atributo em um formulário no IE6 / 7
	formHook = jQuery.attrHooks.name = jQuery.attrHooks.title = jQuery.valHooks.button = {
		get: function (elem, nome) {
			var ret;
			ret = elem.getAttributeNode (nome);
			// Retorna indefinido se nodeValue for string vazia
			retornar ret && ret.nodeValue! == ""?
				ret.nodeValue:
				Indefinido;
		}
		set: function (elem, valor, nome) {
			// Verifique os objetos de formulário no IE (vários bugs relacionados)
			// Use nodeValue apenas se o nó do atributo existir no formulário
			var ret = elem.getAttributeNode (nome);
			se (ret) {
				ret.nodeValue = valor;
				valor de retorno;
			}
		}
	};

	// Defina largura e altura como automático em vez de 0 na string vazia (Bug # 8150)
	// Isto é para remoções
	jQuery.each (["width", "height"], função (i, nome) {
		jQuery.attrHooks [nome] = jQuery.extend (jQuery.attrHooks [nome], {
			set: function (elem, valor) {
				if (value === "") {
					elem.setAttribute (nam e, "auto");
					valor de retorno;
				}
			}
		});
	});
}


// Alguns atributos requerem uma chamada especial no IE
if (! jQuery.support.hrefNormalized) {
	jQuery.each (["href", "src", "width", "height"], função (i, nome) {
		jQuery.attrHooks [nome] = jQuery.extend (jQuery.attrHooks [nome], {
			get: function (elem) {
				var ret = elem.getAttribute (nome, 2);
				retornar ret === nulo? indefinido: ret;
			}
		});
	});
}

if (! jQuery.support.style) {
	jQuery.attrHooks.style = {
		get: function (elem) {
			// Retorna indefinido no caso de string vazia
			// Normaliza para minúsculas, pois o IE maiúscula os nomes de propriedade css
			retornar elem.style.cssText.toLowerCase () || Indefinido;
		}
		set: function (elem, valor) {
			return (elem.style.cssText = "" + valor);
		}
	};
}

// O Safari relata incorretamente a propriedade selecionada padrão de uma opção
// Acessar a propriedade selectedIndex do pai corrige
if (! jQuery.support.optSelected) {
	jQuery.propHooks.selected = jQuery.extend (jQuery.propHooks.selected, {
		get: function (elem) {
			var pai = elem.parentNode;

			if (pai) {
				parent.selectedIndex;

				// Certifique-se de que ele também funcione com optgroups, consulte # 5701
				if (parent.parentNode) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	});
}

// Rádios e caixas de seleção getter / setter
if (! jQuery.support.checkOn) {
	jQuery.each (["radio", "checkbox"], function () {
		jQuery.valHooks [this] = {
			get: function (elem) {
				// Manipula o caso em que o Webkit "" é retornado em vez de "on" se um valor não for especificado
				retornar elem.getAttribute ("value") === null? "on": elem.value;
			}
		};
	});
}
jQuery.each (["radio", "checkbox"], function () {
	jQuery.valHooks [this] = jQuery.extend (jQuery.valHooks [this], {
		set: function (elem, valor) {
			if (jQuery.isArray (valor)) {
				return (elem.checked = jQuery.inArray (jQuery (elem) .val (), valor)> = 0);
			}
		}
	});
});




var rnamespaces = /\.(.*)$/
	rformElems = / ^ (?: textarea | input | select) $ / i,
	rperiod = /\./g,
	rspaces = / / g,
	rescape = ///^^\ws.s.``/g,
	fcleanup = função (nm) {
		return nm.replace (rescape, "\\ $ &");
	};

/ *
 * Várias funções auxiliares usadas para gerenciar eventos.
 * Muitas das idéias por trás deste código foram originadas de
 Biblioteca addEvent de Dean Edwards.
 * /
jQuery.event = {

	// Vincula um evento a um elemento
	// Original de Dean Edwards
	add: function (elem, tipos, manipulador, dados) {
		if (elem.nodeType === 3 || elem.nodeType === 8) {
			Retorna;
		}

		if (manipulador === false) {
			manipulador = returnFalse;
		} else if (manipulador) {
			// Corrige o bug # 7229. Correção recomendada por jdalton
			Retorna;
		}

		var handleObjIn, handleObj;

		if (handler.handler) {
			handleObjIn = manipulador;
			manipulador = handleObjIn.handler;
		}

		// Verifique se a função que está sendo executada possui um ID exclusivo
		if (! handler.guid) {
			handler.guid = jQuery.guid ++;
		}

		// Inicia a estrutura de eventos do elemento
		var elemData = jQuery._data (elem);

		// Se nenhum elemData for encontrado, devemos estar tentando ligar a um dos
		// elementos banidos noData
		if (! elemData) {
			Retorna;
		}

		var events = elemData.events,
			eventHandle = elemData.handle;

		if (! events) {
			elemData.events = events = {};
		}

		if (! eventHandle) {
			elemData.handle = eventHandle = função (e) {
				// Descarte o segundo evento de um jQuery.event.trigger () e
				// quando um evento é chamado depois que uma página é descarregada
				retornar tipo de jQuery! == "indefinido" && (! e || jQuery.event.triggered! == e.type)?
					jQuery.event.handle.apply (eventHandle.elem, argumentos):
					Indefinido;
			};
		}

		// Adiciona elem como uma propriedade da função handle
		// Isso evita o vazamento de memória com eventos não nativos no IE.
		eventHandle.elem = elem;

		// Manipula vários eventos separados por um espaço
		// jQuery (...). bind ("mouseover mouseout", fn);
		types = types.split ("");

		tipo var, i = 0, namespaces;

		while ((type = types [i ++])) {
			handleObj = handleObjIn?
				jQuery.extend ({}, handleObjIn):
				{manipulador: manipulador, dados: dados};

			// Manipuladores de eventos com espaço para nome
			if (type.indexOf (".")> -1) {
				namespaces = type.split (".");
				tipo = namespaces.shift ();
				handleObj.namespace = namespaces.slice (0) .sort (). join (".");

			} outro {
				namespaces = [];
				handleObj.namespace = "";
			}

			handleObj.type = tipo;
			if (! handleObj.guid) {
				handleObj.guid = handler.guid;
			}

			// Pega a lista atual de funções associadas a este evento
			manipuladores var = eventos [tipo],
				special = jQuery.event.special [tipo] || {};

			// Inicia a fila do manipulador de eventos
			if (manipuladores) {
				manipuladores = eventos [tipo] = [];

				// Verifique se há um manipulador de eventos especiais
				// Use apenas addEventListener / attachEvent se o especial
				// manipulador de eventos retorna false
				if (! special.setup || special.setup.call (elem, dados, espaços para nome, eventHandle) === false) {
					// Vincula o manipulador de eventos global ao elemento
					if (elem.addEventListener) {
						elem.addEventListener (tipo, eventHandle, false);

					} se if (elem.attachEvent) {
						elem.attachEvent ("on" + tipo, eventHandle);
					}
				}
			}

			if (special.add) {
				special.add.call (elem, handleObj);

				if (! handleObj.handler.guid) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Adicione a função à lista de manipuladores do elemento
			manipuladores.push (handleObj);

			// Acompanhe quais eventos foram usados, para otimização de eventos
			jQuery.event.global [tipo] = verdadeiro;
		}

		// Nullify elem para evitar vazamentos de memória no IE
		elem = nulo;
	}

	global: {},

	// Desanexar um evento ou conjunto de eventos de um elemento
	remove: function (elem, tipos, manipulador, pos) {
		// não realiza eventos nos nós de texto e comentário
		if (elem.nodeType === 3 || elem.nodeType === 8) {
			Retorna;
		}

		if (manipulador === false) {
			manipulador = returnFalse;
		}

		var ret, tipo, fn, j, i = 0, todos, namespaces, namespace, special, eventType, handleObj, origType,
			elemData = jQuery.hasData (elem) && jQuery._data (elem),
			eventos = elemData && elemData.events;

		if (! elemData ||! events) {
			Retorna;
		}

		// types é realmente um objeto de evento aqui
		if (types && types.type) {
			manipulador = types.handler;
			types = types.type;
		}

		// Desvincular todos os eventos para o elemento
		if (! types || typeof types === "string" && types.charAt (0) === ".") {
			tipos = tipos || "";

			para (digite eventos) {
				jQuery.event.remove (elem, tipo + tipos);
			}

			Retorna;
		}

		// Manipula vários eventos separados por um espaço
		// jQuery (...). unbind ("mouseover mouseout", fn);
		types = types.split ("");

		while ((type = types [i ++])) {
			origType = tipo;
			handleObj = null;
			all = type.indexOf (".") <0;
			namespaces = [];

			eu cai ) {
				// Manipuladores de eventos com espaço para nome
				namespaces = type.split (".");
				tipo = namespaces.shift ();

				namespace = new RegExp ("(^ | \\.)" +
					jQuery.map (namespaces.slice (0) .sort (), fcleanup) .join ("\\. (?:. * \\.)?") + "(\\. | $)");
			}

			eventType = eventos [tipo];

			if (! eventType) {
				continuar;
			}

			if (manipulador) {
				for (j = 0; j <eventType.length; j ++) {
					handleObj = eventType [j];

					if (todos || namespace.test (handleObj.namespace)) {
						jQuery.event.remove (elem, origType, handleObj.handler, j);
						eventType.splice (j--, 1);
					}
				}

				continuar;
			}

			special = jQuery.event.special [tipo] || {};

			para (j = pos || 0; j <eventType.length; j ++) {
				handleObj = eventType [j];

				if (handler.guid === handleObj.guid) {
					// remove o manipulador fornecido para o tipo especificado
					if (todos || namespace.test (handleObj.namespace)) {
						if (pos == null) {
							eventType.splice (j--, 1);
						}

						if (special.remove) {
							special.remove.call (elem, handleObj);
						}
					}

					if (pos! = null) {
						quebrar;
					}
				}
			}

			// remove o manipulador de eventos genérico se não houver mais manipuladores
			if (eventType.length === 0 || pos! = null && eventType.length === 1) {
				if (! special.teardown || special.teardown.call (elem, namespaces) === false) {
					jQuery.removeEvent (elem, tipo, elemData.handle);
				}

				ret = nulo;
				excluir eventos [tipo];
			}
		}

		// Remova o expando se não for mais usado
		if (jQuery.isEmptyObject (events)) {
			var identificador = elemData.handle;
			if (identificador) {
				handle.elem = null;
			}

			delete elemData.events;
			delete elemData.handle;

			if (jQuery.isEmptyObject (elemData)) {
				jQuery.removeData (elem, indefinido, verdadeiro);
			}
		}
	}
	
	// Eventos seguros para curto-circuito se nenhum manipulador estiver conectado.
	// Eventos DOM nativos não devem ser adicionados, eles podem ter manipuladores embutidos.
	customEvent: {
		"getData": true,
		"setData": true,
		"changeData": true
	}

	trigger: function (evento, dados, elem, onlyHandlers) {
		// Objeto de evento ou tipo de evento
		var type = event.type || evento,
			namespaces = [],
			exclusivo;

		if (type.indexOf ("!")> = 0) {
			// Eventos exclusivos são acionados apenas para o evento exato (sem espaços para nome)
			type = type.slice (0, -1);
			exclusivo = verdadeiro;
		}

		if (type.indexOf (".")> = 0) {
			// gatilho no namespace; crie um regexp para corresponder ao tipo de evento no handle ()
			namespaces = type.split (".");
			tipo = namespaces.shift ();
			namespaces.sort ();
		}

		if ((! elem || jQuery.event.customEvent [tipo]) &&! jQuery.event.global [tipo]) {
			// Nenhum manipulador de jQuery para esse tipo de evento e ele não pode ter manipuladores embutidos
			Retorna;
		}

		// O chamador pode transmitir um evento, objeto ou apenas uma sequência de tipos de eventos
		evento = tipo de evento === "objeto"?
			// objeto jQuery.Event
			evento [jQuery.expando]? evento:
			// literal do objeto
			novo jQuery.Event (tipo, evento):
			// Apenas o tipo de evento (string)
			novo jQuery.Event (tipo);

		event.type = tipo;
		event.exclusive = exclusivo;
		event.namespace = namespaces.join (".");
		event.namespace_re = new RegExp ("(^ | \\.)" + namespaces.join ("\\. (?:. * \\.)?") + "(\\. | $)");
		
		// triggerHandler () e eventos globais não fazem bolhas nem executam a ação padrão
		if (onlyHandlers ||! elem) {
			event.preventDefault ();
			event.stopPropagation ();
		}

		// Manipular um gatilho global
		if (! elem) {
			// TODO: Pára de provocar o cache de dados; remova eventos globais e sempre anexe ao documento
			jQuery.each (jQuery.cache, function () {
				// variável internalKey é usada apenas para facilitar a localização
				// e potencialmente altera essas coisas mais tarde; atualmente apenas
				// aponta para jQuery.expando
				var internalKey = jQuery.expando,
					internalCache = this [internalKey];
				if (internalCache && internalCache.events && internalCache.events [tipo]) {
					jQuery.event.trigger (evento, dados, internalCache.handle.elem);
				}
			});
			Retorna;
		}

		// Não faça eventos nos nós de texto e comentário
		if (elem.nodeType === 3 || elem.nodeType === 8) {
			Retorna;
		}

		// Limpe o evento, caso esteja sendo reutilizado
		event.result = indefinido;
		event.target = elem;

		// Clona todos os dados recebidos e precede o evento, criando a lista arg do manipulador
		data = data! = nulo? jQuery.makeArray (dados): [];
		data.unshift (evento);

		var cur = elem,
			// O IE não gosta de nomes de métodos com dois pontos (# 3533, # 8272)
			ontype = type.indexOf (":") <0? "on" + tipo: "";

		// Dispara evento no elemento atual e depois borbulha a árvore DOM
		Faz {
			var identificador = jQuery._data (cur, "identificador");

			event.currentTarget = cur;
			if (identificador) {
				handle.apply (cur, dados);
			}

			// Dispara um script encadernado em linha
			if (ontype && jQuery.acceptData (cur) && cur [ontype] && cur [ontype] .apply (cur, data) === false) {
				event.result = false;
				event.preventDefault ();
			}

			// Bolha até o documento e depois a janela
			cur = cur.parentNode || cur.ownerDocument || cur === event.target.ownerDocument && window;
		} while (cur &&! event.isPropagationStopped ());

		// Se ninguém impediu a ação padrão, faça-o agora
		if (! event.isDefaultPrevented ()) {
			var velho,
				special = jQuery.event.special [tipo] || {};

			if ((! special._default || special._default.call (elem.ownerDocument, event) === false) &&
				! (type === "click" && jQuery.nodeName (elem, "a")) && jQuery.acceptData (elem)) {

				// Chame um método DOM nativo no destino com o mesmo nome que o evento.
				// Não é possível usar uma verificação .isFunction) () aqui porque o IE6 / 7 falha nesse teste.
				// O IE <9 morre no foco para o elemento oculto (# 1486), pode querer revisitar uma tentativa / captura.
				tentar {
					if (ontype && elem [type]) {
						// Não reative um evento onFOO quando chamarmos o método FOO ()
						old = elem [ontype];

						eu dobrei ) {
							elem [ontype] = nulo;
						}

						jQuery.event.triggered = tipo;
						elem [tipo] ();
					}
				} captura (ieErro) {}

				eu dobrei ) {
					elem [ontype] = antigo;
				}

				jQuery.event.triggered = indefinido;
			}
		}
		
		return event.result;
	}

	handle: function (event) {
		evento = jQuery.event.fix (evento || window.event);
		// Faça um instantâneo da lista de manipuladores, pois um manipulador chamado pode adicionar / remover eventos.
		manipuladores var = ((jQuery._data (this, "events") || {}) [event.type] || []). slice (0),
			run_all =! event.exclusive &&! event.namespace,
			args = Array.prototype.slice.call (argumentos, 0);

		// Use o evento corrigido em vez do evento nativo (somente leitura)
		args [0] = evento;
		event.currentTarget = isto;

		for (var j = 0, l = manipuladores.length; j <l; j ++) {
			var handleObj = manipuladores [j];

			// O evento acionado deve 1) não ser exclusivo e não ter espaço para nome, ou
			// 2) possui namespace (s) um subconjunto ou igual aos do evento ligado.
			if (run_all || event.namespace_re.test (handleObj.namespace)) {
				// Passa uma referência para a própria função de manipulador
				// Para que possamos removê-lo mais tarde
				event.handler = handleObj.handler;
				event.data = handleObj.data;
				event.handleObj = handleObj;

				var ret = handleObj.handler.apply (isto, args);

				if (ret! == indefinido) {
					event.result = ret;
					if (ret === false) {
						event.preventDefault ();
						event.stopPropagation ();
					}
				}

				if (event.isImmediatePropagationStopped ()) {
					quebrar;
				}
			}
		}
		return event.result;
	}

	props: "altKey attrChange attrName borbulha botão cancelável charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY páginaX páginaY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta", ".

	correção: função (evento) {
		if (evento [jQuery.expando]) {
			evento de retorno;
		}

		// armazena uma cópia do objeto de evento original
		// e "clone" para definir propriedades somente leitura
		var originalEvent = evento;
		evento = jQuery.Event (originalEvent);

		for (var i = this.props.length, prop; i;) {
			prop = this.props [--i];
			evento [prop] = originalEvent [prop];
		}

		// Corrija a propriedade de destino, se necessário
		if (! event.target) {
			// Correções # 1925 em que srcElement também não pode ser definido
			event.target = event.srcElement || documento;
		}

		// verifica se o destino é um nó de texto (safari)
		if (event.target.nodeType === 3) {
			event.target = event.target.parentNode;
		}

		// Adicione relatedTarget, se necessário
		if (! event.relatedTarget && event.fromElement) {
			event.relatedTarget = event.fromElement === event.target? event.toElement: event.fromElement;
		}

		// Calcular pageX / Y se estiver ausente e clientX / Y disponível
		if (event.pageX == null && event.clientX! = null) {
			var eventDocument = event.target.ownerDocument || documento,
				doc = eventDocument.documentElement,
				body = eventDocument.body;

			event.pageX = event.clientX + (doc && doc.scrollLeft || corpo && body.scrollLeft || 0) - (doc && doc.clientLeft || corpo && body.clientLeft || 0);
			event.pageY = event.clientY + (doc && doc.scrollTop || corpo && body.scrollTop || 0) - (doc && doc.clientTop || corpo && body.clientTop || 0);
		}

		// Adicione qual dos principais eventos
		if (event.which == null && (event.charCode! = null || event.keyCode! = null)) {
			event.which = event.charCode! = null? event.charCode: event.keyCode;
		}

		// Adicione a metaKey a navegadores que não sejam Mac (use ctrl para PC e Meta para Mac)
		if (! event.metaKey && event.ctrlKey) {
			event.metaKey = event.ctrlKey;
		}

		// Adicione qual para o clique: 1 === left; 2 === meio; 3 === certo
		// Nota: o botão não está normalizado, portanto, não o use
		if (! event.which && event.button! == undefined) {
			event.which = (event.button & 1? 1: (event.button & 2? 3: (event.button & 4? 2: 0)));
		}

		evento de retorno;
	}

	// Preterido, use jQuery.guid
	guid: 1E8,

	// Descontinuado, use jQuery.proxy
	proxy: jQuery.proxy,

	especial: {
		pronto: {
			// Verifique se o evento ready está configurado
			instalação: jQuery.bindReady,
			teardown: jQuery.noop
		}

		viver: {
			add: function (handleObj) {
				jQuery.event.add (isso,
					liveConvert (handleObj.origType, handleObj.selector),
					jQuery.extend ({}, handleObj, {manipulador: liveHandler, guid: handleObj.handler.guid}));
			}

			remove: function (handleObj) {
				jQuery.event.remove (this, liveConvert (handleObj.origType, handleObj.selector), handleObj);
			}
		}

		beforeunload: {
			setup: function (dados, espaços para nome, eventHandle) {
				// Só queremos fazer esse caso especial no Windows
				if (jQuery.isWindow (this)) {
					this.onbeforeunload = eventHandle;
				}
			}

			teardown: function (namespaces, eventHandle) {
				if (this.onbeforeunload === eventHandle) {
					this.onbeforeunload = null;
				}
			}
		}
	}
};

jQuery.removeEvent = document.removeEventListener?
	função (elem, tipo, identificador) {
		if (elem.removeEventListener) {
			elem.removeEventListener (tipo, identificador, false);
		}
	}:
	função (elem, tipo, identificador) {
		if (elem.detachEvent) {
			elem.detachEvent ("on" + tipo, identificador);
		}
	};

jQuery.Event = função (src, props) {
	// Permitir instanciação sem a palavra-chave 'new'
	if (! this.preventDefault) {
		retornar novo jQuery.Event (src, props);
	}

	// objeto de evento
	if (src && src.type) {
		this.originalEvent = src;
		this.type = src.type;

		// Eventos que borbulham no documento podem ter sido marcados como impedidos
		// por um manipulador mais abaixo na árvore; refletir o valor correto.
		this.isDefaultPrevented = (src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault ())? returnTrue: returnFalse;

	// Tipo de evento
	} outro {
		this.type = src;
	}

	// Coloque propriedades fornecidas explicitamente no objeto de evento
	if (props) {
		jQuery.extend (isso, props);
	}

	// timeStamp é um buggy para alguns eventos no Firefox (# 3843)
	// Portanto, não confiaremos no valor nativo
	this.timeStamp = jQuery.now ();

	// Marcar como corrigido
	this [jQuery.expando] = true;
};

função returnFalse () {
	retorna falso;
}
função returnTrue () {
	return true;
}

// jQuery.Event é baseado em eventos DOM3, conforme especificado pela ligação de idioma do ECMAScript
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	preventDefault: function () {
		this.isDefaultPrevented = returnTrue;

		var e = this.originalEvent;
		if (! e) {
			Retorna;
		}

		// se preventDefault existir, execute-o no evento original
		if (e.preventDefault) {
			e.preventDefault ();

		// caso contrário, defina a propriedade returnValue do evento original como false (IE)
		} outro {
			e.returnValue = false;
		}
	}
	stopPropagation: function () {
		this.isPropagationStopped = returnTrue;

		var e = this.originalEvent;
		if (! e) {
			Retorna;
		}
		// se stopPropagation existir, execute-o no evento original
		if (e.stopPropagation) {
			e.stopPropagation ();
		}
		// caso contrário, defina a propriedade cancelBubble do evento original como true (IE)
		e.cancelBubble = true;
	}
	stopImmediatePropagation: function () {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation ();
	}
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse
};

// Verifica se um evento aconteceu em um elemento dentro de outro elemento
// Usado nos manipuladores jQuery.event.special.mouseenter e mouseleave
var withinElement = função (evento) {

	// Verifique se o mouse (sobre | out) ainda está dentro do mesmo elemento pai
	var related = event.relatedTarget,
		inside = false,
		eventType = event.type;

	event.type = event.data;

	if (relacionado! == isto) {

		se (relacionado) {
			inside = jQuery.contains (isso, relacionado);
		}

		if (! inside) {

			jQuery.event.handle.apply (isto, argumentos);

			event.type = eventType;
		}
	}
}

// No caso de delegação de eventos, precisamos renomear apenas o event.type,
// liveHandler cuidará do resto.
delegate = function (event) {
	event.type = event.data;
	jQuery.event.handle.apply (isto, argumentos);
};

// Criar eventos mouseenter e mouseleave
jQuery.each ({
	mouseenter: "mouseover",
	ratoeira: "mouseout"
}, função (orig, correção) {
	jQuery.event.special [orig] = {
		setup: function (data) {
			jQuery.event.add (this, fix, data && data.selector? delegate: withinElement, orig);
		}
		teardown: function (data) {
			jQuery.event.remove (this, fix, data && data.selector? delegate: withinElement);
		}
	};
});

// enviar delegação
if (! jQuery.support.submitBubbles) {

	jQuery.event.special.submit = {
		setup: function (dados, namespaces) {
			if (! jQuery.nodeName (this, "form")) {
				jQuery.event.add (este, "click.specialSubmit", função (e) {
					var elem = e.target,
						tipo = elem.type;

					if ((type === "submit" || type === "image") && jQuery (elem) .closest ("form"). length) {
						trigger ("enviar", isso, argumentos);
					}
				});

				jQuery.event.add (este, "keypress.specialSubmit", função (e) {
					var elem = e.target,
						tipo = elem.type;

					if ((type === "text" || type === "password") && jQuery (elem) .closest ("form"). length && e.keyCode === 13) {
						trigger ("enviar", isso, argumentos);
					}
				});

			} outro {
				retorna falso;
			}
		}

		teardown: function (namespaces) {
			jQuery.event.remove (this, ".specialSubmit");
		}
	};

}

// mudar delegação, acontece aqui, então temos bind.
if (! jQuery.support.changeBubbles) {

	var changeFilters,

	getVal = function (elem) {
		var tipo = elem.type, val = elem.value;

		if (digite === "rádio" || digite === "caixa de seleção") {
			val = elem.checked;

		} else if (digite === "selecione múltiplos") {
			val = elem.selectedIndex> -1?
				jQuery.map (elem.options, função (elem) {
					return elem.selected;
				}).Junte-se("-") :
				"";

		} else if (jQuery.nodeName (elem, "select")) {
			val = elem.selectedIndex;
		}

		retorno val;
	}

	testChange = função testChange (e) {
		var elem = e.target, data, val;

		if (! rformElems.test (elem.nodeName) || elem.readOnly) {
			Retorna;
		}

		data = jQuery._data (elem, "_change_data");
		val = getVal (elem);

		// os dados atuais também serão recuperados por beforeactivate
		if (e.type! == "focusout" || elem.type! == "radio") {
			jQuery._data (elem, "_change_data", val);
		}

		if (dados === indefinidos || val === dados) {
			Retorna;
		}

		if (dados! = nulo || val) {
			e.type = "alterar";
			e.liveFired = indefinido;
			jQuery.event.trigger (e, argumentos [1], elem);
		}
	};

	jQuery.event.special.change = {
		filtros: {
			focusout: testChange,

			beforedeactivate: testChange,

			click: function (e) {
				var elem = e.target, digite = jQuery.nodeName (elem, "input")? elem.type: "";

				if (type === "radio" || type === "checkbox" || jQuery.nodeName (elem, "select")) {
					testChange.call (este, e);
				}
			}

			// A alteração deve ser chamada antes do envio
			// Keydown será chamado antes de pressionar a tecla, que é usada na delegação de evento de envio
			keydown: function (e) {
				var elem = e.target, digite = jQuery.nodeName (elem, "input")? elem.type: "";

				if ((e.keyCode === 13 &&! jQuery.nodeName (elem, "textarea"))) ||
					(e.keyCode === 32 && (tipo === "caixa de seleção" || tipo === "rádio")) ||
					type === "select-multiple") {
					testChange.call (este, e);
				}
			}

			// Antes de ativar, também acontece antes que o elemento anterior seja desfocado
			// com esse evento, você não pode acionar um evento de alteração, mas pode armazenar
			// em formação
			antes de ativar: function (e) {
				var elem = e.target;
				jQuery._data (elem, "_change_data", getVal (elem));
			}
		}

		setup: function (dados, namespaces) {
			if (this.type === "arquivo") {
				retorna falso;
			}

			for (tipo var em changeFilters) {
				jQuery.event.add (este, digite + ".specialChange", changeFilters [tipo]);
			}

			retornar rformElems.test (this.nodeName);
		}

		teardown: function (namespaces) {
			jQuery.event.remove (this, ".specialChange");

			retornar rformElems.test (this.nodeName);
		}
	};

	changeFilters = jQuery.event.special.change.filters;

	// Manipula quando a entrada é .focus () 'd
	changeFilters.focus = changeFilters.beforeactivate;
}

acionador de função (tipo, elem, args) {
	// Sobreposto em um evento doador para simular um evento diferente.
	// OriginalEvent falso para evitar o stopPropagation do doador, mas se o
	// evento simulado impede o padrão, então fazemos o mesmo no doador.
	// Não passe argumentos ou lembre-se de liveFired; eles se aplicam ao evento do doador.
	evento var = jQuery.extend ({}, args [0]);
	event.type = tipo;
	event.originalEvent = {};
	event.liveFired = indefinido;
	jQuery.event.handle.call (elem, evento);
	if (event.isDefaultPrevented ()) {
		args [0] .preventDefault ();
	}
}

// Crie eventos de foco e desfocagem "bubbling"
if (! jQuery.support.focusinBubbles) {
	jQuery.each ({focus: "focusin", blur: "focusout"}, função (origem, correção) {

		// Anexa um único manipulador de captura enquanto alguém deseja o focusin / focusout
		var anexos = 0;

		jQuery.event.special [correção] = {
			setup: function () {
				if (anexa ++ === 0) {
					document.addEventListener (orig, handler, true);
				}
			}
			teardown: function () {
				if (--attaches === 0) {
					document.removeEventListener (orig, handler, true);
				}
			}
		};

		manipulador de funções (doador) {
			// O evento do doador é sempre nativo; conserte-o e mude seu tipo.
			// Deixe o manipulador focusin / out cancelar o evento de foco / desfoque do doador.
			var e = jQuery.event.fix (doador);
			e.type = correção;
			e.originalEvent = {};
			jQuery.event.trigger (e, null, e.target);
			if (e.isDefaultPrevented ()) {
				donor.preventDefault ();
			}
		}
	});
}

jQuery.each (["bind", "one"], função (i, nome) {
	jQuery.fn [nome] = função (tipo, dados, fn) {
		manipulador de var;

		// Lidar com literais de objeto
		if (typeof tipo === "objeto") {
			for (tipo de chave var) {
				este [nome] (chave, dados, digite [chave], fn);
			}
			devolva isso;
		}

		if (argument.length === 2 || data === false) {
			fn = dados;
			dados = indefinidos;
		}

		if (name === "one") {
			manipulador = função (evento) {
				jQuery (this) .unbind (evento, manipulador);
				return fn.apply (isto, argumentos);
			};
			handler.guid = fn.guid || jQuery.guid ++;
		} outro {
			manipulador = fn;
		}

		if (digite === "descarregar" && name! == "one") {
			this.one (tipo, dados, fn);

		} outro {
			for (var i = 0, l = this.length; i <l; i ++) {
				jQuery.event.add (este [i], tipo, manipulador, dados);
			}
		}

		devolva isso;
	};
});

jQuery.fn.extend ({
	unbind: function (tipo, fn) {
		// Lidar com literais de objeto
		if (typeof type === "object" &&! type.preventDefault) {
			for (tipo de chave var) {
				this.unbind (chave, digite [chave]);
			}

		} outro {
			for (var i = 0, l = this.length; i <l; i ++) {
				jQuery.event.remove (este [i], tipo, fn);
			}
		}

		devolva isso;
	}

	delegate: function (seletor, tipos, dados, fn) {
		retorne this.live (tipos, dados, fn, seletor);
	}

	undelegate: function (seletor, tipos, fn) {
		if (argument.length === 0) {
			retorne this.unbind ("live");

		} outro {
			retorne this.die (tipos, nulo, fn, seletor);
		}
	}

	trigger: function (tipo, dados) {
		retorne this.each (function () {
			jQuery.event.trigger (tipo, dados, este);
		});
	}

	triggerHandler: function (tipo, dados) {
		if (este [0]) {
			retornar jQuery.event.trigger (tipo, dados, este [0], verdadeiro);
		}
	}

	alternar: função (fn) {
		// Salve a referência aos argumentos para acessar no fechamento
		var args = argumentos,
			guid = fn.guid || jQuery.guid ++,
			i = 0
			toggler = função (evento) {
				// Descobrir qual função executar
				var lastToggle = (jQuery.data (este, "lastToggle" + fn.guid) || 0)% i;
				jQuery.data (este, "lastToggle" + fn.guid, lastToggle + 1);

				// Certifique-se de que os cliques parem
				event.preventDefault ();

				// e executa a função
				retornar args [lastToggle] .apply (isto, argumentos) || falso;
			};

		// vincula todas as funções, para que qualquer uma delas possa desvincular esse manipulador de cliques
		toggler.guid = guia;
		while (i <comprimento do argumento) {
			args [i ++] .guid = guid;
		}

		retorne this.click (toggler);
	}

	hover: function (fnOver, fnOut) {
		retorne this.mouseenter (fnOver) .mouseleave (fnOut || fnOver);
	}
});

var liveMap = {
	focus: "focusin",
	blur: "focusout",
	mouseenter: "mouseover",
	ratoeira: "mouseout"
};

jQuery.each (["live", "die"], função (i, nome) {
	jQuery.fn [nome] = função (tipos, dados, fn, origSelector / * Somente uso interno * /) {
		tipo var, i = 0, correspondência, namespaces, preType,
			seletor = origSelector || this.selector,
			context = origSelector? this: jQuery (this.context);

		if (typeof types === "object" &&! types.preventDefault) {
			para (chave var em tipos) {
				contexto [nome] (chave, dados, tipos [chave], seletor);
			}

			devolva isso;
		}

		if (name === "die" &&! types &&
					origSelector && origSelector.charAt (0) === "." ) {

			context.unbind (origSelector);

			devolva isso;
		}

		if (data === false || jQuery.isFunction (data)) {
			fn = dados || retorna falso;
			dados = indefinidos;
		}

		types = (types || "") .split ("");

		while ((type = types [i ++])! = null) {
			match = rnamespaces.exec (tipo);
			namespaces = "";

			if (match) {
				namespaces = correspondência [0];
				type = type.replace (rnamespaces, "");
			}

			if (digite === "passe o mouse") {
				types.push ("mouseenter" + namespaces, "mouseleave" + namespaces);
				continuar;
			}

			preType = tipo;

			if (liveMap [type]) {
				types.push (liveMap [type] + namespaces);
				type = type + namespaces;

			} outro {
				type = (liveMap [tipo] || tipo) + namespaces;
			}

			if (name === "live") {
				// liga o manipulador ao vivo
				for (var j = 0, l = context.length; j <l; j ++) {
					jQuery.event.add (contexto [j], "ao vivo". + liveConvert (tipo, seletor),
						{data: data, seletor: seletor, manipulador: fn, origType: type, origHandler: fn, preType: preType});
				}

			} outro {
				// desvincular manipulador ao vivo
				context.unbind ("live". + liveConvert (tipo, seletor), fn);
			}
		}

		devolva isso;
	};
});

função liveHandler (evento) {
	var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret,
		elems = [],
		seletores = [],
		eventos = jQuery._data (isto, "eventos");

	// Certifique-se de evitar bolhas de cliques sem esquerda no Firefox (# 3861) e elementos desabilitados no IE (# 6911)
	if (event.liveFired === this ||! events ||! events.live || event.target.disabled || event.button && event.type === "clique") {
		Retorna;
	}

	if (event.namespace) {
		namespace = new RegExp ("(^ | \\.)" + event.namespace.split ("."). join ("\\. (?:. * \\.)?") + "(\\. | $) ");
	}

	event.liveFired = isto;

	var live = events.live.slice (0);

	para (j = 0; j <comprimento do arquivo; j ++) {
		handleObj = live [j];

		if (handleObj.origType.replace (rnamespaces, "") === event.type) {
			selectors.push (handleObj.selector);

		} outro {
			live.splice (j--, 1);
		}
	}

	match = jQuery (event.target) .closest (seletores, event.currentTarget);

	for (i = 0, l = match.length; i <l; i ++) {
		fechar = combinar [i];

		para (j = 0; j <comprimento do arquivo; j ++) {
			handleObj = live [j];

			if (close.selector === handleObj.selector && (! namespace || namespace.test (handleObj.namespace)) &&! close.elem.disabled) {
				elem = close.elem;
				relacionado = nulo;

				// Esses dois eventos exigem verificação adicional
				if (handleObj.preType === "mouseenter" || handleObj.preType === "mouse mouseleave") {
					event.type = handleObj.preType;
					related = jQuery (event.relatedTarget) .closest (handleObj.selector) [0];

					// Certifique-se de não coincidir acidentalmente um elemento filho com o mesmo seletor
					if (related && jQuery.contains (elem, related)) {
						related = elem;
					}
				}

				if (! relacionado || relacionado! == elem) {
					elems.push ({elem: elem, handleObj: handleObj, nível: close.level});
				}
			}
		}
	}

	para (i = 0, l = elems.length; i <l; i ++) {
		match = elems [i];

		if (maxLevel && match.level> maxLevel) {
			quebrar;
		}

		event.currentTarget = match.elem;
		event.data = match.handleObj.data;
		event.handleObj = match.handleObj;

		ret = match.handleObj.origHandler.apply (match.elem, argumentos);

		if (ret === false || event.isPropagationStopped ()) {
			maxLevel = match.level;

			if (ret === false) {
				stop = false;
			}
			if (event.isImmediatePropagationStopped ()) {
				quebrar;
			}
		}
	}

	parada de retorno;
}

função liveConvert (tipo, seletor) {
	return (tipo && tipo! == "*"? tipo + ".": "") + selector.replace (rperiod, "` ") .replace (rspaces," & ");
}

jQuery.each (("foco borrado, foco em foco, carga, redimensionamento, rolagem, descarregamento, clique em dblclick"
	"mouse mousedown mouse mousemove mouseover mouseout mouseenter mouseleave" +
	"alterar selecionar enviar erro de pressionamento de tecla pressionado"). divisão (""), função (i, nome) {

	// Lidar com ligação de eventos
	jQuery.fn [nome] = função (dados, fn) {
		if (fn == null) {
			fn = dados;
			data = nulo;
		}

		return argument.length> 0?
			this.bind (nome, dados, fn):
			this.trigger (nome);
	};

	if (jQuery.attrFn) {
		jQuery.attrFn [nome] = verdadeiro;
	}
});



/ *!
 * Mecanismo seletor de CSS Sizzle
 * Copyright 2011, Fundação Dojo
 * Lançado sob as licenças MIT, BSD e GPL.
 * Mais informações: http://sizzlejs.com/
 * /
(função(){

var chunker = / ((?: \ ((?: \ ([^ ()) + \) | [^ ()] +) + \) | \] | \ [(?: \ [[^ \ [\]] *) \] | ['"] [^'"] * ['"] | [^ \ [\]'"] +) + \] | \\. | [^> + ~, (\ [\\] + ) + | [> + ~]) (\ s *, \ s *)? ((?:. | \ r | \ n) *) / g,
	done = 0,
	toString = Object.prototype.toString,
	hasDuplicate = false,
	baseHasDuplicate = true,
	rBackslash = / \\ / g,
	rNonWord = / \ W /;

// Aqui verificamos se o mecanismo JavaScript está usando algum tipo de
// otimização onde nem sempre chama nossa comparação
// função. Se for esse o caso, descarte o valor hasDuplicate.
// Até agora, isso inclui o Google Chrome.
[0, 0] .sort (função () {
	baseHasDuplicate = false;
	retornar 0;
});

var Sizzle = função (seletor, contexto, resultados, semente) {
	resultados = resultados || [];
	contexto = contexto || documento;

	var origContext = contexto;

	if (context.nodeType! == 1 && context.nodeType! == 9) {
		Retorna [];
	}
	
	if (! seletor || tipo de seletor! == "string") {
		retornar resultados;
	}

	var m, set, checkSet, extra, ret, cur, pop, i,
		ameixa = verdadeira,
		contextXML = Sizzle.isXML (contexto),
		partes = [],
		soFar = seletor;
	
	// Redefine a posição do chunker regexp (comece do início)
	Faz {
		chunker.exec ("");
		m = chunker.exec (soFar);

		se (m) {
			soFar = m [3];
		
			parts.push (m [1]);
		
			se (m [2]) {
				extra = m [3];
				quebrar;
			}
		}
	} enquanto (m);

	if (parts.length> 1 && origPOS.exec (seletor)) {

		if (parts.length === 2 && Expr.relative [parts [0]]) {
			set = posProcess (partes [0] + partes [1], contexto);

		} outro {
			set = Expr.relative [partes [0]]?
				[contexto]:
				Sizzle (parts.shift (), contexto);

			while (parts.length) {
				seletor = parts.shift ();

				if (Expr.relative [selector]) {
					seletor + = parts.shift ();
				}
				
				set = posProcess (seletor, conjunto);
			}
		}

	} outro {
		// Pegue um atalho e defina o contexto se o seletor raiz for um ID
		// (mas não se for mais rápido se o seletor interno for um ID)
		if (! seed && parts.length> 1 && context.nodeType === 9 &&! contextXML &&
				Expr.match.ID.test (partes [0]) &&! Expr.match.ID.test (partes [parts.length - 1])) {

			ret = Sizzle.find (parts.shift (), contexto, contextXML);
			contexto = ret.expr?
				Filtro chiado (ret.expr, ret.set) [0]:
				ret.set [0];
		}

		if (context) {
			ret = semente?
				{expr: parts.pop (), conjunto: makeArray (seed)}:
				Sizzle.find (parts.pop (), parts.length === 1 && (parts [0] === "~" || parts [0] === "+") && context.parentNode? Context.parentNode : contexto, contextXML);

			set = ret.expr?
				Sizzle.filter (ret.expr, ret.set):
				ret.set;

			if (parts.length> 0) {
				checkSet = makeArray (conjunto);

			} outro {
				ameixa = falso;
			}

			while (parts.length) {
				cur = parts.pop ();
				pop = cur;

				if (! Expr.relative [cur]) {
					cur = "";
				} outro {
					pop = parts.pop ();
				}

				if (pop == null) {
					pop = contexto;
				}

				Expr.relative [cur] (checkSet, pop, contextXML);
			}

		} outro {
			checkSet = partes = [];
		}
	}

	if (! checkSet) {
		checkSet = set;
	}

	if (! checkSet) {
		Sizzle.error (seletor cur ||);
	}

	if (toString.call (checkSet) === "[matriz do objeto]") {
		if (! podar) {
			results.push.apply (results, checkSet);

		} mais se (context && context.nodeType === 1) {
			for (i = 0; checkSet [i]! = nulo; i ++) {
				if (checkSet [i] && (checkSet [i] === true || checkSet [i] .nodeType === 1 && Sizzle.contains (contexto, checkSet [i]))) {
					results.push (conjunto [i]);
				}
			}

		} outro {
			for (i = 0; checkSet [i]! = nulo; i ++) {
				if (checkSet [i] && checkSet [i] .nodeType === 1) {
					results.push (conjunto [i]);
				}
			}
		}

	} outro {
		makeArray (checkSet, resultados);
	}

	se (extra) {
		Chiar (extra, origContext, resultados, semente);
		Sizzle.uniqueSort (resultados);
	}

	retornar resultados;
};

Sizzle.uniqueSort = function (results) {
	if (sortOrder) {
		hasDuplicate = baseHasDuplicate;
		results.sort (sortOrder);

		if (hasDuplicate) {
			for (var i = 1; i <results.length; i ++) {
				if (resultados [i] === resultados [i - 1]) {
					resultados.plice (i--, 1);
				}
			}
		}
	}

	retornar resultados;
};

Sizzle.matches = function (expr, set) {
	return Sizzle (expr, nulo, nulo, conjunto);
};

Sizzle.matchesSelector = function (nó, expr) {
	return Sizzle (expr, nulo, nulo, [nó]). comprimento> 0;
};

Sizzle.find = function (expr, contexto, isXML) {
	conjunto de var;

	if (! expr) {
		Retorna [];
	}

	for (var i = 0, l = Expr.order.length; i <l; i ++) {
		correspondência de var,
			type = Expr.order [i];
		
		if ((match = Expr.leftMatch [type] .exec (expr))) {
			var esquerda = correspondência [1];
			match.splice (1, 1);

			if (left.substr (left.length - 1)! == "\\") {
				match [1] = (match [1] || "") .replace (rBackslash, "");
				set = Expr.find [tipo] (correspondência, contexto, isXML);

				if (definido! = nulo) {
					expr = expr.replace (Expr.match [tipo], "");
					quebrar;
				}
			}
		}
	}

	if (! set) {
		set = typeof context.getElementsByTagName! == "undefined"?
			context.getElementsByTagName ("*"):
			[];
	}

	retornar {set: set, expr: expr};
};

Sizzle.filter = function (expr, set, inplace, not) {
	correspondência de var, anyFound,
		old = expr,
		resultado = [],
		curLoop = set,
		isXMLFilter = set && set [0] && Sizzle.isXML (set [0]);

	while (expr && set.length) {
		for (tipo var no Expr.filter) {
			if ((match = Expr.leftMatch [type] .exec (expr))! = null && match [2]) {
				var encontrado, item,
					filter = Expr.filter [tipo],
					esquerda = partida [1];

				anyFound = false;

				match.splice (1,1);

				if (left.substr (left.length - 1) === "\\") {
					continuar;
				}

				if (resultado curLoop ===) {
					resultado = [];
				}

				if (Expr.preFilter [tipo]) {
					match = Expr.preFilter [tipo] (match, curLoop, inplace, result, not, isXMLFilter);

					if (! match) {
						anyFound = found = true;

					} se if (match === true) {
						continuar;
					}
				}

				if (match) {
					for (var i = 0; (item = curLoop [i])! = nulo; i ++) {
						if (item) {
							encontrado = filtro (item, correspondência, i, curLoop);
							var pass = not ^ !! encontrado;

							if (local && encontrado! = nulo) {
								se (aprovado) {
									anyFound = true;

								} outro {
									curLoop [i] = falso;
								}

							} caso contrário, se (aprovado) {
								result.push (item);
								anyFound = true;
							}
						}
					}
				}

				if (encontrado! == indefinido) {
					if (! inplace) {
						curLoop = resultado;
					}

					expr = expr.replace (Expr.match [tipo], "");

					if (! anyFound) {
						Retorna [];
					}

					quebrar;
				}
			}
		}

		// Expressão incorreta
		if (expr === antigo) {
			if (anyFound == null) {
				Sizzle.error (expr);

			} outro {
				quebrar;
			}
		}

		old = expr;
	}

	return curLoop;
};

Sizzle.error = function (msg) {
	throw "Erro de sintaxe, expressão não reconhecida:" + msg;
};

var Expr = Sizzle.selectors = {
	ordem: ["ID", "NAME", "TAG"],

	partida: {
		ID: /#((?:[\w\u00c0-\uFFFF\-{|\\.)+)/,
		CLASS:: /\.((?:[\w\u00c0-\uFFFF\-}|\\.)+)/,
		NOME: /\[name=['")*((?:[\w\u00c0-\uFFFF\-}|\\.)+)['")*\)/,
		ATTR: / \ [\ s * ((?: [\ W \ u00c0- \ uFFFF \ -] | \\.) +) \ S * (?: (\ S? =) \ S * (?: ([ '"]) (. *?) \ 3 | (#? (?: [\ W \ u00c0- \ uFFFF \ -] | \\.) *) |) |) \ S * \] /,
		TAG: /^((?:[\w\u00c0-\uFFFF\*\-)|\\.)+)/,
		CRIANÇA: / :( apenas | enésimo | último | primeiro) - filho (?: \ (\ S * (par | ímpar | | |?: [+ \ -]? \ D + | (?: [+ \ -]? \ d *)? n \ s * (?: [+ \ -] \ s * \ d +)?)) \ s * \))? /,
		POS: / :( enésimo | eq | gt | lt | primeiro | último | par | ímpar) (?: \ ((\ D *) \))? (? = [^ \ -] | $) /,
		PSEUDO: /:((?:[\w\u00c0-\uFFFF\-)|\\.)+)(?:\(("'")?)((?:\([^\))+ \) | [^ \ (\)] *) +) \ 2 \))? /
	}

	leftMatch: {},

	attrMap: {
		"class": "className",
		"for": "htmlFor"
	}

	attrHandle: {
		href: function (elem) {
			retornar elem.getAttribute ("href");
		}
		type: function (elem) {
			retornar elem.getAttribute ("type");
		}
	}

	relativo: {
		"+": função (checkSet, parte) {
			var isPartStr = tipo de peça === "string",
				isTag = isPartStr &&! rNonWord.test (parte),
				isPartStrNotTag = isPartStr &&! isTag;

			if (isTag) {
				part = part.toLowerCase ();
			}

			for (var i = 0, l = checkSet.length, elem; i <l; i ++) {
				if ((elem = checkSet [i])) {
					while ((elem = elem.previousSibling) && elem.nodeType! == 1) {}

					checkSet [i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase () === parte?
						elem || false:
						elem === parte;
				}
			}

			if (isPartStrNotTag) {
				Sizzle.filter (parte, checkSet, true);
			}
		}

		">": function (checkSet, parte) {
			var elem,
				isPartStr = typeof part === "string",
				i = 0
				l = checkSet.length;

			if (isPartStr &&! rNonWord.test (part)) {
				part = part.toLowerCase ();

				para (; i <l; i ++) {
					elem = checkSet [i];

					if (elem) {
						var pai = elem.parentNode;
						checkSet [i] = parent.nodeName.toLowerCase () === parte? pai: falso;
					}
				}

			} outro {
				para (; i <l; i ++) {
					elem = checkSet [i];

					if (elem) {
						checkSet [i] = isPartStr?
							elem.parentNode:
							elem.parentNode === parte;
					}
				}

				if (isPartStr) {
					Sizzle.filter (parte, checkSet, true);
				}
			}
		}

		"": function (checkSet, parte, isXML) {
			var nodeCheck,
				doneName = done ++,
				checkFn = dirCheck;

			if (typeof part === "string" &&! rNonWord.test (part)) {
				part = part.toLowerCase ();
				nodeCheck = parte;
				checkFn = dirNodeCheck;
			}

			checkFn ("parentNode", parte, doneName, checkSet, nodeCheck, isXML);
		}

		"~": function (checkSet, parte, isXML) {
			var nodeCheck,
				doneName = done ++,
				checkFn = dirCheck;

			if (typeof part === "string" &&! rNonWord.test (part)) {
				part = part.toLowerCase ();
				nodeCheck = parte;
				checkFn = dirNodeCheck;
			}

			checkFn ("previousSibling", parte, doneName, checkSet, nodeCheck, isXML);
		}
	}

	encontrar: {
		ID: function (correspondência, contexto, isXML) {
			if (typeof context.getElementById! == "undefined" &&! isXML) {
				var m = context.getElementById (correspondência [1]);
				// Verifique parentNode para capturar quando o Blackberry 4.6 retornar
				// nós que não estão mais no documento # 6963
				retornar m && m.parentNode? [m]: [];
			}
		}

		NAME: function (correspondência, contexto) {
			if (typeof context.getElementsByName! == "undefined") {
				var ret = [],
					resultados = context.getElementsByName (match [1]);

				for (var i = 0, l = results.length; i <l; i ++) {
					if (results [i] .getAttribute ("name") === corresponde a [1]) {
						ret.push (resultados [i]);
					}
				}

				return ret.length === 0? nulo: ret;
			}
		}

		TAG: função (correspondência, contexto) {
			if (typeof context.getElementsByTagName! == "undefined") {
				retornar context.getElementsByTagName (match [1]);
			}
		}
	}
	preFilter: {
		CLASS: function (match, curLoop, inplace, result, not, isXML) {
			match = "" + match [1] .replace (rBackslash, "") + "";

			if (isXML) {
				partida de retorno;
			}

			for (var i = 0, elem; (elem = curLoop [i])! = nulo; i ++) {
				if (elem) {
					if (not ^ (elem.className && ("" + elem.className + "")). substitua (/ [\ t \ n \ r] / g, "") .indexOf (match)> = 0) {
						if (! inplace) {
							result.push (elem);
						}

					} senão se (no local) {
						curLoop [i] = falso;
					}
				}
			}

			retorna falso;
		}

		ID: função (correspondência) {
			return match [1] .replace (rBackslash, "");
		}

		TAG: function (match, curLoop) {
			return match [1] .replace (rBackslash, "") .toLowerCase ();
		}

		CRIANÇA: função (correspondência) {
			if (corresponder [1] === "enésimo") {
				if (! match [2]) {
					Sizzle.error (partida [0]);
				}

				match [2] = match [2] .replace (/ ^ \ + | \ s * / g, '');

				// analisa equações como 'par', 'ímpar', '5', '2n', '3n + 2', '4n-1', '-n + 6'
				var teste = / (-?) (\ d *) (?: n ([+ \ -]? \ d *))? /. exec (
					corresponder [2] === "par" e& "2n" || corresponder [2] === "ímpar" e& "2n + 1" ||
					! / \ D / .test (correspondência [2]) && "0n +" + correspondência [2] || partida [2]);

				// calcula os números (primeiro) n + (último) incluindo se eles são negativos
				correspondência [2] = (teste [1] + (teste [2] || 1)) - 0;
				correspondência [3] = teste [3] - 0;
			}
			senão se (corresponder [2]) {
				Sizzle.error (partida [0]);
			}

			// TODO: Mover para o sistema de cache normal
			correspondência [0] = concluída ++;

			partida de retorno;
		}

		ATTR: function (match, curLoop, inplace, result, not, isXML) {
			var name = match [1] = match [1] .replace (rBackslash, "");
			
			if (! isXML && Expr.attrMap [nome]) {
				match [1] = Expr.attrMap [nome];
			}

			// Identifica se um valor sem aspas foi usado
			match [4] = (match [4] || match [5] || "") .replace (rBackslash, "");

			if (combine [2] === "~ =") {
				partida [4] = "" + partida [4] + "";
			}

			partida de retorno;
		}

		PSEUDO: function (match, curLoop, inplace, result, not) {
			if (corresponder [1] === "não") {
				// Se estamos lidando com uma expressão complexa ou simples
				if ((chunker.exec (match [3]) || "") .length> 1 || /^\w/.test(match[3])) {
					partida [3] = chiar (partida [3], nulo, nulo, curLoop);

				} outro {
					var ret = Sizzle.filter (correspondência [3], curLoop, inplace, true ^ not);

					if (! inplace) {
						result.push.apply (resultado, ret);
					}

					retorna falso;
				}

			} else if (Expr.match.POS.test (correspondência [0]) || Expr.match.CHILD.test (correspondência [0])) {
				return true;
			}
			
			partida de retorno;
		}

		POS: função (correspondência) {
			match.unshift (verdadeiro);

			partida de retorno;
		}
	}
	
	filtros: {
		enabled: function (elem) {
			return elem.disabled === false && elem.type! == "oculto";
		}

		disabled: function (elem) {
			return elem.disabled === true;
		}

		verificado: função (elem) {
			return elem.checked === true;
		}
		
		selected: function (elem) {
			// O acesso a essa propriedade torna selecionado por padrão
			// as opções no Safari funcionam corretamente
			if (elem.parentNode) {
				elem.parentNode.selectedIndex;
			}
			
			return elem.selected === true;
		}

		pai: função (elem) {
			return !! elem.firstChild;
		}

		empty: function (elem) {
			return! elem.firstChild;
		}

		has: function (elem, i, match) {
			return !! Sizzle (match [3], elem) .length;
		}

		cabeçalho: função (elem) {
			return (/ h \ d / i). teste (elem.nodeName);
		}

		text: function (elem) {
			var attr = elem.getAttribute ("tipo"), tipo = elem.type;
			// IE6 e 7 mapearão elem.type para 'text' para novos tipos de HTML5 (pesquisa, etc) 
			// use getAttribute para testar este caso
			retornar elem.nodeName.toLowerCase () === "input" && "text" === tipo && (attr === tipo || attr === null);
		}

		radio: function (elem) {
			retornar elem.nodeName.toLowerCase () === "input" && "radio" === elem.type;
		}

		caixa de seleção: function (elem) {
			retornar elem.nodeName.toLowerCase () === "input" && "checkbox" === elem.type;
		}

		file: function (elem) {
			retornar elem.nodeName.toLowerCase () === "input" && "file" === elem.type;
		}

		password: function (elem) {
			retornar elem.nodeName.toLowerCase () === "input" && "password" === elem.type;
		}

		submit: function (elem) {
			var name = elem.nodeName.toLowerCase ();
			return (nome === "entrada" || nome === "botão") && "submit" === elem.type;
		}

		image: function (elem) {
			retornar elem.nodeName.toLowerCase () === "input" && "image" === elem.type;
		}

		reset: function (elem) {
			var name = elem.nodeName.toLowerCase ();
			return (nome === "entrada" || nome === "botão") && "reset" === elem.type;
		}

		button: function (elem) {
			var name = elem.nodeName.toLowerCase ();
			nome do retorno === "input" && "button" === elem.type || nome === "botão";
		}

		input: function (elem) {
			return (/ input | select | textarea | button / i) .test (elem.nodeName);
		}

		focus: function (elem) {
			return elem === elem.ownerDocument.activeElement;
		}
	}
	setFilters: {
		primeiro: function (elem, i) {
			retornar i === 0;
		}

		last: function (elem, i, match, array) {
			return i === array.length - 1;
		}

		par: função (elem, i) {
			retornar i% 2 === 0;
		}

		ímpar: função (elem, i) {
			retornar i% 2 === 1;
		}

		lt: function (elem, i, match) {
			retornar i <correspondência [3] - 0;
		}

		gt: function (elem, i, match) {
			retornar i> combinar [3] - 0;
		}

		enésima: função (elem, i, correspondência) {
			correspondência de retorno [3] - 0 === i;
		}

		eq: function (elem, i, match) {
			correspondência de retorno [3] - 0 === i;
		}
	}
	filtro: {
		PSEUDO: function (elem, match, i, array) {
			nome da var = correspondência [1],
				filter = Expr.filters [nome];

			if (filtro) {
				filtro de retorno (elem, i, match, array);

			} caso contrário, se (nome === "contiver") {
				return (elem.textContent || elem.innerText || Sizzle.getText ([elem]) || "") .indexOf (match [3])> = 0;

			} senão se (nome === "não") {
				var not = correspondência [3];

				for (var j = 0, l = not.length; j <l; j ++) {
					if (não [j] === elem) {
						retorna falso;
					}
				}

				return true;

			} outro {
				Sizzle.error (nome);
			}
		}

		CHILD: function (elem, match) {
			tipo var = correspondência [1],
				nó = elem;

			switch (tipo) {
				case "only":
				caso "primeiro":
					while ((node ​​= node.previousSibling)) {
						if (node.nodeType === 1) { 
							retorna falso; 
						}
					}

					if (digite === "primeiro") { 
						return true; 
					}

					nó = elem;

				case "last":
					while ((node ​​= node.nextSibling)) {
						if (node.nodeType === 1) { 
							retorna falso; 
						}
					}

					return true;

				caso "enésimo":
					var primeiro = correspondência [2],
						last = match [3];

					if (first === 1 && last === 0) {
						return true;
					}
					
					var doneName = correspondência [0],
						pai = elem.parentNode;
	
					if (parent && (parent.sizcache! == doneName ||! elem.nodeIndex)) {
						contagem de var = 0;
						
						for (node ​​= parent.firstChild; node; node = node.nextSibling) {
							if (node.nodeType === 1) {
								node.nodeIndex = ++ contagem;
							}
						} 

						parent.sizcache = doneName;
					}
					
					var diff = elem.nodeIndex - último;

					if (primeiro === 0) {
						retorno diff === 0;

					} outro {
						return (diff% first === 0 && diff / first> = 0);
					}
			}
		}

		ID: function (elem, match) {
			retornar elem.nodeType === 1 && elem.getAttribute ("id") === match;
		}

		TAG: função (elem, correspondência) {
			return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase () === corresponde;
		}
		
		CLASS: function (elem, match) {
			return ("" + (elem.className || elem.getAttribute ("class")) + "")
				.indexOf (partida)> -1;
		}

		ATTR: function (elem, match) {
			nome da var = correspondência [1],
				resultado = Expr.attrHandle [nome]?
					Expr.attrHandle [nome] (elem):
					elem [nome]! = nulo?
						elem [nome]:
						elem.getAttribute (nome),
				valor = resultado + "",
				tipo = correspondência [2],
				cheque = combinação [4];

			retornar resultado == nulo?
				tipo === "! =":
				tipo === "="?
				value === verifique:
				tipo === "* ="?
				value.indexOf (check)> = 0:
				tipo === "~ ="?
				("" + valor + "") .indexOf (verificação)> = 0:
				!Verifica ?
				value && result! == false:
				tipo === "! ="?
				value! == verifique:
				tipo === "^ ="?
				value.indexOf (check) === 0:
				tipo === "$ ="?
				value.substr (value.length - check.length) === verifique:
				tipo === "| ="?
				valor === verificar || value.substr (0, check.length + 1) === check + "-":
				falso;
		}

		POS: função (elem, match, i, array) {
			nome da var = correspondência [2],
				filter = Expr.setFilters [nome];

			if (filtro) {
				filtro de retorno (elem, i, match, array);
			}
		}
	}
};

var origPOS = Expr.match.POS,
	fescape = função (todos, num) {
		retornar "\\" + (num - 0 + 1);
	};

for (tipo var em Expr.match) {
	Expr.match [type] = new RegExp (Expr.match [type] .source + (/(?![^\[**\))(?![^\()*))/.source)) ;
	Expr.leftMatch [type] = new RegExp (/(^(?:.|\r|\n)*?)/.source + Expr.match [tipo] .source.replace (/ \\ (\ d +) / g, fescape));
}

var makeArray = função (matriz, resultados) {
	array = Array.prototype.slice.call (array, 0);

	if (results) {
		results.push.apply (resultados, matriz);
		retornar resultados;
	}
	
	matriz de retorno;
};

// Execute uma verificação simples para determinar se o navegador é capaz de
// convertendo um NodeList em uma matriz usando métodos internos.
// Verifica também se a matriz retornada contém nós DOM
// (que não é o caso no navegador Blackberry)
tentar {
	Array.prototype.slice.call (document.documentElement.childNodes, 0) [0] .nodeType;

// Forneça um método de fallback se não funcionar
} captura (e) {
	makeArray = função (matriz, resultados) {
		var i = 0,
			ret = resultados || [];

		if (toString.call (array) === "[matriz do objeto]") {
			Array.prototype.push.apply (ret, array);

		} outro {
			if (typeof array.length === "number") {
				for (var l = array.length; i <l; i ++) {
					ret.push (matriz [i]);
				}

			} outro {
				para (; matriz [i]; i ++) {
					ret.push (matriz [i]);
				}
			}
		}

		return ret;
	};
}

var sortOrder, siblingCheck;

if (document.documentElement.compareDocumentPosition) {
	sortOrder = função (a, b) {
		if (a === b) {
			hasDuplicate = true;
			retornar 0;
		}

		if (! a.compareDocumentPosition ||! b.compareDocumentPosition) {
			retornar a.compareDocumentPosition? -1: 1;
		}

		retornar a.compareDocumentPosition (b) e 4? -1: 1;
	};

} outro {
	sortOrder = função (a, b) {
		// Os nós são idênticos, podemos sair mais cedo
		if (a === b) {
			hasDuplicate = true;
			retornar 0;

		// Retorno ao uso do sourceIndex (no IE) se estiver disponível nos dois nós
		} caso contrário, se (a.sourceIndex && b.sourceIndex) {
			retornar a.sourceIndex - b.sourceIndex;
		}

		var al, bl
			ap = []
			bp = []
			aup = a.parentNode,
			bup = b.parentNode,
			cur = aup;

		// Se os nós são irmãos (ou idênticos), podemos fazer uma verificação rápida
		if (aup === bup) {
			retornar siblingCheck (a, b);

		// Se nenhum pai foi encontrado, os nós são desconectados
		} caso contrário, se (! aup) {
			retorno -1;

		} senão se (! bup) {
			retornar 1;
		}

		// Caso contrário, eles estão em outro lugar na árvore, então precisamos
		// para criar uma lista completa dos parentNodes para comparação
		while (cur) {
			ap.unshift (cur);
			cur = cur.parentNode;
		}

		cur = bup;

		while (cur) {
			desvio-padrão (cur);
			cur = cur.parentNode;
		}

		al = comprimento;
		bl = bp.length;

		// Comece a andar pela árvore procurando uma discrepância
		for (var i = 0; i <al && i <bl; i ++) {
			if (ap [i]! == bp [i]) {
				retornar siblingCheck (ap [i], bp [i]);
			}
		}

		// Acabamos em algum lugar da árvore, assim como uma verificação de irmãos
		retornar i === al?
			siblingCheck (a, bp [i], -1):
			siblingCheck (ap [i], b, 1);
	};

	siblingCheck = função (a, b, ret) {
		if (a === b) {
			return ret;
		}

		var cur = a.nextSibling;

		while (cur) {
			if (cur === b) {
				retorno -1;
			}

			cur = cur.nextSibling;
		}

		retornar 1;
	};
}

// Função utilitário para recuperar o valor do texto de uma matriz de nós DOM
Sizzle.getText = function (elems) {
	var ret = "", elem;

	for (var i = 0; elems [i]; i ++) {
		elem = elems [i];

		// Obtém o texto dos nós de texto e CDATA
		if (elem.nodeType === 3 || elem.nodeType === 4) {
			ret + = elem.nodeValue;

		// Atravessa todo o resto, exceto nós de comentários
		} else if (elem.nodeType! == 8) {
			ret + = Sizzle.getText (elem.childNodes);
		}
	}

	return ret;
};

// Verifique se o navegador retorna elementos pelo nome quando
// consulta por getElementById (e fornece uma solução alternativa)
(função(){
	// Vamos injetar um elemento de entrada falso com um nome especificado
	var form = document.createElement ("div"),
		id = "script" + (nova data ()). getTime (),
		root = document.documentElement;

	form.innerHTML = "<a name='" + id + "'/>";

	// Injete no elemento raiz, verifique seu status e remova-o rapidamente
	root.insertBefore (formulário, root.firstChild);

	// A solução alternativa precisa fazer verificações adicionais após um getElementById
	// O que torna as coisas mais lentas para outros navegadores (daí a ramificação)
	if (document.getElementById (id)) {
		Expr.find.ID = função (correspondência, contexto, isXML) {
			if (typeof context.getElementById! == "undefined" &&! isXML) {
				var m = context.getElementById (correspondência [1]);

				retornar m?
					m.id === corresponde a [1] || tipo de m.getAttributeNode! == "indefinido" && m.getAttributeNode ("id"). nodeValue === corresponde a [1]?
						[m]:
						Indefinido :
					[];
			}
		};

		Expr.filter.ID = function (elem, match) {
			var node = tipo de elem.getAttributeNode! == "undefined" && elem.getAttributeNode ("id");

			retornar elem.nodeType === 1 && node && node.nodeValue === match;
		};
	}

	root.removeChild (formulário);

	// libera memória no IE
	raiz = forma = nulo;
}) ();

(função(){
	// Verifique se o navegador retorna apenas elementos
	// ao executar getElementsByTagName ("*")

	// Crie um elemento falso
	var div = document.createElement ("div");
	div.appendChild (document.createComment ("")));

	// Verifique se não foram encontrados comentários
	if (div.getElementsByTagName ("*"). length> 0) {
		Expr.find.TAG = função (correspondência, contexto) {
			var resultados = context.getElementsByTagName (match [1]);

			// Filtrar possíveis comentários
			if (combine [1] === "*") {
				var tmp = [];

				para (var i = 0; resultados [i]; i ++) {
					if (resultados [i] .nodeType === 1) {
						tmp.push (resultados [i]);
					}
				}

				resultados = tmp;
			}

			retornar resultados;
		};
	}

	// Verifique se um atributo retorna atributos href normalizados
	div.innerHTML = "<a href='#'> </a>";

	if (div.firstChild && tipo de div.firstChild.getAttribute! == "undefined" &&
			div.firstChild.getAttribute ("href")! == "#") {

		Expr.attrHandle.href = função (elem) {
			retornar elem.getAttribute ("href", 2);
		};
	}

	// libera memória no IE
	div = nulo;
}) ();

if (document.querySelectorAll) {
	(função(){
		var oldSizzle = Sizzle,
			div = document.createElement ("div"),
			id = "__sizzle__";

		div.innerHTML = "<p class = 'TEST'> </p>";

		// O Safari não pode manipular caracteres maiúsculos ou unicode quando
		// no modo peculiares.
		if (div.querySelectorAll && div.querySelectorAll (". TEST"). length === 0) {
			Retorna;
		}
	
		Sizzle = function (consulta, contexto, extra, semente) {
			contexto = contexto || documento;

			// Use apenas querySelectorAll em documentos não XML
			// (os seletores de ID não funcionam em documentos não HTML)
			if (! seed &&! Sizzle.isXML (contexto)) {
				// Veja se encontramos um seletor para acelerar
				var match = / ^ (\ w + $) | ^ \. ([\ w \ -] + $) | ^ # ([\ w \ -] + $) /. exec (consulta);
				
				if (corresponder && (context.nodeType === 1 || context.nodeType === 9)) {
					// Aceleração: chiar ("TAG")
					if (corresponder [1]) {
						retornar makeArray (context.getElementsByTagName (query), extra);
					
					// Aceleração: chiar (". CLASS")
					} else if (combine [2] && Expr.find.CLASS && context.getElementsByClassName) {
						retornar makeArray (context.getElementsByClassName (match [2]), extra);
					}
				}
				
				if (context.nodeType === 9) {
					// Aceleração: chiar ("corpo")
					// O elemento body existe apenas uma vez, otimize encontrá-lo
					if (query === "body" && context.body) {
						retornar makeArray ([context.body], extra);
						
					// Acelerar: chiar ("# ID")
					} mais se (corresponder && corresponder [3]) {
						var elem = context.getElementById (match [3]);

						// Verifique parentNode para capturar quando o Blackberry 4.6 retornar
						// nós que não estão mais no documento # 6963
						if (elem && elem.parentNode) {
							// Lida com o caso em que o IE e o Opera retornam itens
							// por nome em vez de ID
							if (elem.id === corresponde a [3]) {
								retornar makeArray ([elem], extra);
							}
							
						} outro {
							retornar makeArray ([], extra);
						}
					}
					
					tentar {
						retornar makeArray (context.querySelectorAll (query), extra);
					} captura (qsaError) {}

				// qSA funciona estranhamente em consultas com raiz de elemento
				// Podemos solucionar isso especificando um ID extra na raiz
				// e trabalhando a partir daí (obrigado a Andrew Dupont pela técnica)
				// IE 8 não funciona em elementos de objeto
				} else if (context.nodeType === 1 && context.nodeName.toLowerCase ()! == "object") {
					var oldContext = contexto,
						old = context.getAttribute ("id"),
						nid = antigo || Eu iria,
						hasParent = context.parentNode,
						relatedHierarchySelector = / ^ \ s * [+ ~] /. test (consulta);

					eu dobrei ) {
						context.setAttribute ("id", nid);
					} outro {
						nid = nid.replace (/ '/ g, "\\ $ &");
					}
					if (relativeHierarchySelector && hasParent) {
						context = context.parentNode;
					}

					tentar {
						if (! relativeHierarchySelector || hasParent) {
							retornar makeArray (context.querySelectorAll ("[id = '" + nid + "']" + consulta), extra);
						}

					} catch (pseudoError) {
					} finalmente {
						eu dobrei ) {
							oldContext.removeAttribute ("id");
						}
					}
				}
			}
		
			retornar oldSizzle (consulta, contexto, extra, semente);
		};

		for (var prop em oldSizzle) {
			Sizzle [prop] = oldSizzle [prop];
		}

		// libera memória no IE
		div = nulo;
	}) ();
}

(função(){
	var html = document.documentElement,
		correspondências = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector;

	if (corresponde) {
		// Verifique se é possível fazer correspondências
		// em um nó desconectado (o IE 9 falha nisso)
		varconnectedMatch =! match.call (document.createElement ("div"), "div"),
			pseudoWorks = false;

		tentar {
			// Isso deve falhar com uma exceção
			// Gecko não erro, retorna falso em vez disso
			match.call (document.documentElement, "[test! = '']: chiar");
	
		} catch (pseudoError) {
			pseudoWorks = true;
		}

		Sizzle.matchesSelector = function (nó, expr) {
			// Verifique se os seletores de atributo estão entre aspas
			expr = expr.replace (/ \ = \ s * ([^ '"\]] *) \ s * \] / g," =' $ 1 '] ");

			if (! Sizzle.isXML (nó)) {
				tentar { 
					if (pseudoWorks ||! Expr.match.PSEUDO.test (expr) &&! /! = /. test (expr)) {
						var ret = corresponde.chamada (nó, expr);

						// IE 9's matchSelector retorna false em nós desconectados
						if (ret || !connectedMatch ||
								// Além disso, os nós desconectados estão em um documento
								// fragmento no IE 9, então verifique se
								node.document && node.document.nodeType! == 11) {
							return ret;
						}
					}
				} captura (e) {}
			}

			return Sizzle (expr, null, null, [node]). length> 0;
		};
	}
}) ();

(função(){
	var div = document.createElement ("div");

	div.innerHTML = "<div class = 'teste e'> </div> <div class = 'teste'> </div>";

	// O Opera não consegue encontrar um segundo nome de classe (na 9.6)
	// Além disso, verifique se realmente existe getElementsByClassName
	if (! div.getElementsByClassName || div.getElementsByClassName ("e"). length === 0) {
		Retorna;
	}

	// O Safari armazena em cache os atributos da classe, não captura as alterações (em 3.2)
	div.lastChild.className = "e";

	if (div.getElementsByClassName ("e"). length === 1) {
		Retorna;
	}
	
	Expr.order.splice (1, 0, "CLASS");
	Expr.find.CLASS = função (correspondência, contexto, isXML) {
		if (typeof context.getElementsByClassName! == "undefined" &&! isXML) {
			retornar context.getElementsByClassName (match [1]);
		}
	};

	// libera memória no IE
	div = nulo;
}) ();

função dirNodeCheck (dir, cur, doneName, checkSet, nodeCheck, isXML) {
	for (var i = 0, l = checkSet.length; i <l; i ++) {
		var elem = checkSet [i];

		if (elem) {
			var match = false;

			elem = elem [dir];

			while (elem) {
				if (elem.sizcache === doneName) {
					match = checkSet [elem.sizset];
					quebrar;
				}

				if (elem.nodeType === 1 &&! isXML) {
					elem.sizcache = doneName;
					elem.sizset = i;
				}

				if (elem.nodeName.toLowerCase () === act) {
					match = elem;
					quebrar;
				}

				elem = elem [dir];
			}

			checkSet [i] = correspondência;
		}
	}
}

função dirCheck (dir, cur, doneName, checkSet, nodeCheck, isXML) {
	for (var i = 0, l = checkSet.length; i <l; i ++) {
		var elem = checkSet [i];

		if (elem) {
			var match = false;
			
			elem = elem [dir];

			while (elem) {
				if (elem.sizcache === doneName) {
					match = che ckSet [elem.sizset];
					quebrar;
				}

				if (elem.nodeType === 1) {
					if (! isXML) {
						elem.sizcache = doneName;
						elem.sizset = i;
					}

					if (typeof cur! == "string") {
						if (elem === cur) {
							match = true;
							quebrar;
						}

					} else if (Sizzle.filter (cur, [elem]) .length> 0) {
						match = elem;
						quebrar;
					}
				}

				elem = elem [dir];
			}

			checkSet [i] = correspondência;
		}
	}
}

if (document.documentElement.contains) {
	Sizzle.contains = function (a, b) {
		retornar a! == b && (a.contains? a.contains (b): true);
	};

} else if (document.documentElement.compareDocumentPosition) {
	Sizzle.contains = function (a, b) {
		return !! (a.compareDocumentPosition (b) & 16);
	};

} outro {
	Sizzle.contains = function () {
		retorna falso;
	};
}

Sizzle.isXML = function (elem) {
	// documentElement é verificado nos casos em que ainda não existe
	// (como carregar iframes no IE - # 4833) 
	var documentElement = (elem? elem.ownerDocument || elem: 0) .documentElement;

	retornar documentElement? documentElement.nodeName! == "HTML": false;
};

var posProcess = function (seletor, contexto) {
	correspondência de var,
		tmpSet = [],
		mais tarde = "",
		root = context.nodeType? [contexto]: contexto;

	// Os seletores de posição devem ser feitos após o filtro
	// E também deve: não (posicional), então movemos todos os PSEUDOs para o final
	while ((match = Expr.match.PSEUDO.exec (seletor))) {
		depois + = corresponder [0];
		seletor = seletor.replace (Expr.match.PSEUDO, "");
	}

	seletor = Expr.relativo [seletor]? seletor + "*": seletor;

	for (var i = 0, l = comprimento da raiz; i <l; i ++) {
		Chiar (seletor, raiz [i], tmpSet);
	}

	return Sizzle.filter (mais tarde, tmpSet);
};

// EXPOR
jQuery.find = chiar;
jQuery.expr = Sizzle.selectors;
jQuery.expr [":"] = jQuery.expr.filters;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


}) ();


var runtil = / até $ /,
	rparentsprev = / ^ (?: pais | prevAté | prevAll) /,
	// Nota: Este RegExp deve ser aprimorado ou provavelmente extraído do Sizzle
	rmultiselector = /, /,
	isSimple = /^.[^:#\[\.,}*$/,
	slice = Array.prototype.slice,
	POS = jQuery.expr.match.POS,
	// métodos garantidos para produzir um conjunto exclusivo ao iniciar a partir de um conjunto exclusivo
	Guaranteedique = {
		filhos: verdade,
		conteúdo: true,
		próximo: verdadeiro,
		prev: true
	};

jQuery.fn.extend ({
	find: function (seletor) {
		var self = isso,
			eu, eu;

		if (typeof selector! == "string") {
			retornar jQuery (seletor) .filter (function () {
				para (i = 0, l = comprimento próprio; i <l; i ++) {
					if (jQuery.contains (self [i], isso)) {
						return true;
					}
				}
			});
		}

		var ret = this.pushStack ("", "find", seletor),
			comprimento, n, r;

		para (i = 0, l = this.length; i <l; i ++) {
			comprimento = comprimento ret;
			jQuery.find (seletor, este [i], ret);

			se (i> 0) {
				// Verifique se os resultados são únicos
				for (n = comprimento; n <comprimento ret.; n ++) {
					para (r = 0; r <comprimento; r ++) {
						if (ret [r] === ret [n]) {
							ret.splice (n--, 1);
							quebrar;
						}
					}
				}
			}
		}

		return ret;
	}

	has: function (target) {
		alvos var = jQuery (destino);
		retorne this.filter (function () {
			para (var i = 0, l = target.length; i <l; i ++) {
				if (jQuery.contains (this, segmenta [i])) {
					return true;
				}
			}
		});
	}

	not: function (seletor) {
		retorne this.pushStack (winnow (este, seletor, falso), "não", seletor);
	}

	filter: function (seletor) {
		retorne this.pushStack (winnow (este, seletor, verdadeiro), "filtro", seletor);
	}

	is: function (seletor) {
		return !! selector && (typeof selector === "string"?
			jQuery.filter (seletor, este) .length> 0:
			this.filter (seletor) .length> 0);
	}

	o mais próximo: função (seletores, contexto) {
		var ret = [], i, l, cur = este [0];
		
		// Matriz
		if (jQuery.isArray (seletores)) {
			correspondência de var, seletor,
				corresponde = {},
				nível = 1;

			if (cur && selectors.length) {
				for (i = 0, l = selectors.length; i <l; i ++) {
					seletor = seletores [i];

					if (! corresponde ao [seletor]) {
						corresponde [seletor] = POS.test (seletor)?
							jQuery (seletor, contexto || this.context):
							seletor;
					}
				}

				while (cur && cur.ownerDocument && cur! == contexto) {
					for (seletor em correspondências) {
						match = combina [seletor];

						if (match.jquery? match.index (cur)> -1: jQuery (cur) .is (match)) {
							ret.push ({seletor: seletor, elem: cur, nível: nível});
						}
					}

					cur = cur.parentNode;
					nível ++;
				}
			}

			return ret;
		}

		// Corda
		var pos = teste POS (seletores) || typeof seletores! == "string"?
				jQuery (seletores, contexto || this.context):
				0;

		para (i = 0, l = this.length; i <l; i ++) {
			cur = isto [i];

			while (cur) {
				if (pos? pos.index (cur)> -1: jQuery.find.matchesSelector (cur, seletores)) {
					ret.push (cur);
					quebrar;

				} outro {
					cur = cur.parentNode;
					if (! cur ||! cur.ownerDocument || cur === contexto || cur.nodeType === 11) {
						quebrar;
					}
				}
			}
		}

		ret = comprimento ret.> 1? jQuery.unique (ret): ret;

		retornar this.pushStack (ret, "mais próximo", seletores);
	}

	// Determina a posição de um elemento dentro
	// o conjunto de elementos correspondente
	index: function (elem) {
		if (! elem || typeof elem === "string") {
			retornar jQuery.inArray (this [0],
				// Se recebe uma string, o seletor é usado
				// Se não receber nada, os irmãos serão usados
				elem? jQuery (elem): this.parent (). children ());
		}
		// Localize a posição do elemento desejado
		retornar jQuery.inArray (
			// Se recebe um objeto jQuery, o primeiro elemento é usado
			elem.jquery? elem [0]: elem, isso);
	}

	add: function (seletor, contexto) {
		var set = tipo de seletor === "string"?
				jQuery (seletor, contexto):
				jQuery.makeArray (seletor && selector.nodeType? [seletor]: seletor),
			all = jQuery.merge (this.get (), conjunto);

		retorne this.pushStack (isDisconnected (definido [0]) || isDisconnected (todos [0])?
			todos :
			jQuery.unique (todos));
	}

	andSelf: function () {
		retorne this.add (this.prevObject);
	}
});

// Uma verificação simples para ver se um elemento está desconectado
// de um documento (deve ser aprimorado, sempre que possível).
função isDisconnected (node) {
	return! node || ! node.parentNode || node.parentNode.nodeType === 11;
}

jQuery.each ({
	pai: função (elem) {
		var pai = elem.parentNode;
		retornar pai && parent.nodeType! == 11? pai: nulo;
	}
	pais: função (elem) {
		retornar jQuery.dir (elem, "parentNode");
	}
	parentsUntil: function (elem, i, até) {
		retornar jQuery.dir (elem, "parentNode", até);
	}
	próximo: function (elem) {
		retornar jQuery.nth (elem, 2, "nextSibling");
	}
	prev: function (elem) {
		return jQuery.nth (elem, 2, "previousSibling");
	}
	nextAll: function (elem) {
		retornar jQuery.dir (elem, "nextSibling");
	}
	prevAll: function (elem) {
		retornar jQuery.dir (elem, "previousSibling");
	}
	nextUntil: function (elem, i, até) {
		retornar jQuery.dir (elem, "nextSibling", até);
	}
	prevUntil: function (elem, i, até) {
		retornar jQuery.dir (elem, "previousSibling", até);
	}
	irmãos: função (elem) {
		retornar jQuery.sibling (elem.parentNode.firstChild, elem);
	}
	children: function (elem) {
		retornar jQuery.sibling (elem.firstChild);
	}
	contents: function (elem) {
		retornar jQuery.nodeName (elem, "iframe")?
			elem.contentDocument || elem.contentWindow.document:
			jQuery.makeArray (elem.childNodes);
	}
}, função (nome, fn) {
	jQuery.fn [nome] = função (até o seletor) {
		var ret = jQuery.map (isto, fn, até),
			// A variável 'args' foi introduzida em
			// https://github.com/jquery/jquery/commit/52a0238
			// para solucionar um bug no Chrome 10 (Dev) e deve ser removido quando o bug for corrigido.
			// http://code.google.com/p/v8/issues/detail?id=1050
			args = slice.call (argumentos);

		if (! runtil.test (nome)) {
			seletor = até;
		}

		if (seletor && tipo de seletor === "string") {
			ret = jQuery.filter (seletor, ret);
		}

		ret = this.length> 1 &&! Guaranteedique [nome]? jQuery.unique (ret): ret;

		if ((this.length> 1 || rmultiselector.test (seletor)) && rparentsprev.test (nome)) {
			ret = ret.reverse ();
		}

		retorne this.pushStack (ret, name, args.join (","));
	};
});

jQuery.extend ({
	filter: function (expr, elems, not) {
		se não ) {
			expr = ": not (" + expr + ")";
		}

		retornar elems.length === 1?
			jQuery.find.matchesSelector (elems [0], expr)? [elems [0]]: []:
			jQuery.find.matches (expr, elems);
	}

	dir: função (elem, dir, até) {
		var corresponde = [],
			cur = elem [dir];

		while (cur && cur.nodeType! == 9 && (até === indefinido || cur.nodeType! == 1 ||! jQuery (cur) .is (até))) {
			if (cur.nodeType === 1) {
				pareado.push (cur);
			}
			cur = cur [dir];
		}
		retorno combinado;
	}

	enésimo: função (cur, resultado, dir, elem) {
		resultado = resultado || 1;
		var num = 0;

		para (; cur; cur = cur [dir]) {
			if (cur.nodeType === 1 && ++ num === resultado) {
				quebrar;
			}
		}

		retorno cur;
	}

	irmão: função (n, elem) {
		var r = [];

		for (; n; n = n.nextSibling) {
			if (n.nodeType === 1 && n! == elem) {
				r.push (n);
			}
		}

		retornar r;
	}
});

// Implementa a funcionalidade idêntica para filter e não
function winnow( elements, qualifier, keep ) {

	// Can't pass null or undefined to indexOf in Firefox 4
	// Set to 0 to skip string check
	qualifier = qualifier || 0;

	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep(elements, function( elem, i ) {
			var retVal = !!qualifier.call( elem, i, elem );
			return retVal === keep;
		});

	} else if ( qualifier.nodeType ) {
		return jQuery.grep(elements, function( elem, i ) {
			return (elem === qualifier) === keep;
		});

	} else if ( typeof qualifier === "string" ) {
		var filtered = jQuery.grep(elements, function( elem ) {
			return elem.nodeType === 1;
		});

		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter(qualifier, filtered, !keep);
		} else {
			qualifier = jQuery.filter( qualifier, filtered );
		}
	}

	return jQuery.grep(elements, function( elem, i ) {
		return (jQuery.inArray( elem, qualifier ) >= 0) === keep;
	});
}




var rinlinejQuery = / jQuery \ d + = "(?: \ d + | null)" / g,
	rleadingWhitespace = / ^ \ s + /,
	rxhtmlTag = / <(?! area | br | col | embed | hr | img | input | link | meta | param) (([\ w:] +) [^>] *) \ /> / ig,
	rtagName = / <([\ w:] +) /,
	rtbody = / <tbody / i,
	rhtml = / <| & #? \ w +; /,
	rnocache = / <(?: script | objeto | incorporar | opção | estilo) / i,
	// verificado = "verificado" ou verificado
	rchecked = /checked\s*(?:[^=)|=\s*.checked.)/i,
	rscriptType = / \ / (java | ecma) script / i,
	rcleanScript = / ^ \ s * <! (?: \ [CDATA \ [| \ - \ -) ​​/,
	wrapMap = {
		opção: [1, "<selecione multiple = 'multiple'>", "</select>"],
		legenda: [1, "<fieldset>", "</fieldset>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table> <tbody>", "</tbody> </table>"],
		td: [3, "<table> <tbody> <tr>", "</tr> </tbody> </table>"],
		col: [2, "<table> <tbody> </tbody> <colgroup>", "</colgroup> </table>"],
		área: [1, "<map>", "</map>"],
		_default: [0, "", ""]
	};

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// O IE não pode serializar as tags <link> e <script> normalmente
if (! jQuery.support.htmlSerialize) {
	wrapMap._default = [1, "div <div>", "</div>"];
}

jQuery.fn.extend ({
	texto: função (texto) {
		if (jQuery.isFunction (text)) {
			retorne this.each (function (i) {
				var self = jQuery (isto);

				self.text (text.call (this, i, self.text ()));
			});
		}

		if (typeof text! == "object" && text! == undefined) {
			retorne this.empty (). append ((this [0] && this [0] .ownerDocument || documento) .createTextNode (text));
		}

		retornar jQuery.text (isto);
	}

	wrapAll: function (html) {
		if (jQuery.isFunction (html)) {
			retorne this.each (function (i) {
				jQuery (this) .wrapAll (html.call (this, i));
			});
		}

		if (este [0]) {
			// Os elementos para envolver o alvo
			var wrap = jQuery (html, este [0] .ownerDocument) .eq (0) .clone (true);

			if (este [0] .parentNode) {
				wrap.insertBefore (this [0]);
			}

			wrap.map (function () {
				var elem = isto;

				while (elem.firstChild && elem.firstChild.nodeType === 1) {
					elem = elem.firstChild;
				}

				elem de retorno;
			}). append (this);
		}

		devolva isso;
	}

	wrapInner: function (html) {
		if (jQuery.isFunction (html)) {
			retorne this.each (function (i) {
				jQuery (this) .wrapInner (html.call (this, i));
			});
		}

		retorne this.each (function () {
			var self = jQuery (isso),
				content = self.contents ();

			if (contents.length) {
				contents.wrapAll (html);

			} outro {
				self.append (html);
			}
		});
	}

	wrap: function (html) {
		retorne this.each (function () {
			jQuery (this) .wrapAll (html);
		});
	}

	desembrulhar: function () {
		retorne this.parent (). each (function () {
			if (! jQuery.nodeName (this, "body"))) {
				jQuery (this) .replaceWith (this.childNodes);
			}
		}).fim();
	}

	append: function () {
		retorne this.domManip (argumentos, verdadeiro, função (elem) {
			if (this.nodeType === 1) {
				this.appendChild (elem);
			}
		});
	}

	prepend: function () {
		retorne this.domManip (argumentos, verdadeiro, função (elem) {
			if (this.nodeType === 1) {
				this.insertBefore (elem, this.firstChild);
			}
		});
	}

	antes: function () {
		if (this [0] && this [0] .parentNode) {
			retorne this.domManip (argumentos, falso, função (elem) {
				this.parentNode.insertBefore (elem, this);
			});
		} else if (argumentos.length) {
			var set = jQuery (argumentos [0]);
			set.push.apply (set, this.toArray ());
			retornar this.pushStack (set, "before", argumentos);
		}
	}

	after: function () {
		if (this [0] && this [0] .parentNode) {
			retorne this.domManip (argumentos, falso, função (elem) {
				this.parentNode.insertBefore (elem, this.nextSibling);
			});
		} else if (argumentos.length) {
			var set = this.pushStack (this, "after", argumentos);
			set.push.apply (set, jQuery (argumentos [0]). toArray ());
			conjunto de retorno;
		}
	}

	// keepData é apenas para uso interno - não documente
	remove: function (seletor, keepData) {
		for (var i = 0, elem; (elem = this [i])! = nulo; i ++) {
			if (! seletor || jQuery.filter (seletor, [elem]). .length) {
				if (! keepData && elem.nodeType === 1) {
					jQuery.cleanData (elem.getElementsByTagName ("*"));
					jQuery.cleanData ([elem]);
				}

				if (elem.parentNode) {
					elem.parentNode.removeChild (elem);
				}
			}
		}

		devolva isso;
	}

	vazio: function () {
		for (var i = 0, elem; (elem = this [i])! = nulo; i ++) {
			// Remova os nós do elemento e evite vazamentos de memória
			if (elem.nodeType === 1) {
				jQuery.cleanData (elem.getElementsByTagName ("*"));
			}

			// Remova todos os nós restantes
			while (elem.firstChild) {
				elem.removeChild (elem.firstChild);
			}
		}

		devolva isso;
	}

	clone: ​​function (dataAndEvents, deepDataAndEvents) {
		dataAndEvents = dataAndEvents == nulo? false: dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == nulo? dataAndEvents: deepDataAndEvents;

		retorne this.map (function () {
			retornar jQuery.clone (this, dataAndEvents, deepDataAndEvents);
		});
	}

	html: function (value) {
		if (value === undefined) {
			retornar este [0] && este [0] .nodeType === 1?
				this [0] .innerHTML.replace (rinlinejQuery, ""):
				nulo;

		// Veja se podemos pegar um atalho e apenas usar innerHTML
		} else if (typeof value === "string" &&! rnocache.test (value) &&
			(jQuery.support.leadingWhitespace ||! rleadingWhitespace.test (value)) &&
			! wrapMap [(rtagName.exec (valor) || ["", ""]) [1] .toLowerCase ()]) {

			value = value.replace (rxhtmlTag, "<$ 1> </ $ 2>");

			tentar {
				for (var i = 0, l = this.length; i <l; i ++) {
					// Remova os nós do elemento e evite vazamentos de memória
					if (este [i] .nodeType === 1) {
						jQuery.cleanData (this [i] .getElementsByTagName ("*"));
						este [i] .innerHTML = valor;
					}
				}

			// Se o innerHTML usar uma exceção, use o método fallback
			} captura (e) {
				this.empty (). append (value);
			}

		} else if (jQuery.isFunction (value)) {
			this.each (function (i) {
				var self = jQuery (isto);

				self.html (value.call (this, i, self.html ()));
			});

		} outro {
			this.empty (). append (value);
		}

		devolva isso;
	}

	replaceWith: function (value) {
		if (this [0] && this [0] .parentNode) {
			// Certifique-se de que os elementos sejam removidos do DOM antes de serem inseridos
			// isso pode ajudar a corrigir a substituição de um pai por elementos filho
			if (jQuery.isFunction (value)) {
				retorne this.each (function (i) {
					var self = jQuery (this), antigo = self.html ();
					self.replaceWith (value.call (this, i, old));
				});
			}

			if (typeof value! == "string") {
				valor = jQuery (valor) .detach ();
			}

			retorne this.each (function () {
				var next = this.nextSibling,
					parent = this.parentNode;

				jQuery (this) .remove ();

				se (próximo) {
					jQuery (próximo) .before (valor);
				} outro {
					jQuery (pai) .append (valor);
				}
			});
		} outro {
			retornar this.length?
				this.pushStack (jQuery (jQuery.isFunction (value)? value (): value), "replaceWith", value):
				isto;
		}
	}

	desanexar: função (seletor) {
		retorne this.remove (seletor, true);
	}

	domManip: function (args, tabela, retorno de chamada) {
		resultados var, primeiro, fragmento, pai,
			valor = args [0],
			scripts = [];

		// Não podemos clonar fragmentos que contenham marcados no WebKit
		if (! jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test (value)) {
			retorne this.each (function () {
				jQuery (this) .domManip (args, tabela, retorno de chamada, true);
			});
		}

		if (jQuery.isFunction (value)) {
			retorne this.each (function (i) {
				var self = jQuery (isto);
				args [0] = value.call (esta, i, tabela? self.html (): indefinida);
				self.domManip (args, tabela, retorno de chamada);
			});
		}

		if (este [0]) {
			pai = valor && value.parentNode;

			// Se estivermos em um fragmento, use-o em vez de criar um novo
			if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
				resultados = {fragmento: pai};

			} outro {
				resultados = jQuery.buildFragment (args, this, scripts);
			}

			fragmento = resultado.fragmento;

			if (fragment.childNodes.length === 1) {
				primeiro = fragmento = fragmento.PrimeiraChild;
			} outro {
				first = fragment.firstChild;
			}

			se (primeiro) {
				tabela = tabela && jQuery.nodeName (primeiro, "tr");

				for (var i = 0, l = this.length, lastIndex = l - 1; i <l; i ++) {
					callback.call (
						mesa ?
							raiz (este [i], primeiro):
							isso [i],
						// Certifique-se de que não vazamos memória descartando inadvertidamente
						// o fragmento original (que pode ter anexado dados) em vez de
						// usando isso; Além disso, use o objeto de fragmento original para o último
						// item em vez de primeiro porque pode acabar sendo esvaziado incorretamente
						// em determinadas situações (Bug # 8070).
						// Fragmentos do cache de fragmentos sempre devem ser clonados e nunca usados
						// no lugar.
						results.cacheable || (l> 1 && i <lastIndex)?
							jQuery.clone (fragmento, verdadeiro, verdadeiro):
							fragmento
					);
				}
			}

			if (scripts.length) {
				jQuery.each (scripts, evalScript);
			}
		}

		devolva isso;
	}
});

raiz da função (elem, cur) {
	retornar jQuery.nodeName (elem, "tabela")?
		(elem.getElementsByTagName ("tbody") [0] ||
		elem.appendChild (elem.ownerDocument.createElement ("tbody"))):
		elem;
}

função cloneCopyEvent (src, dest) {

	if (dest.nodeType! == 1 ||! jQuery.hasData (src)) {
		Retorna;
	}

	var internalKey = jQuery.expando,
		oldData = jQuery.data (src),
		curData = jQuery.data (dest, oldData);

	// Alterne para usar o objeto de dados interno, se existir, para a próxima
	// estágio de cópia de dados
	if ((oldData = oldData [internalKey])) {
		var events = oldData.events;
				curData = curData [internalKey] = jQuery.extend ({}, oldData);

		if (eventos) {
			excluir curData.handle;
			curData.events = {};

			para (tipo var em eventos) {
				for (var i = 0, l = events [type] .length; i <l; i ++) {
					jQuery.event.add (dest, digite + (events [type] [i] .namespace? ".": "") + events [type] [i] .namespace, events [type] [i], events [type ] [i] .dados);
				}
			}
		}
	}
}

função cloneFixAttributes (src, dest) {
	var nodeName;

	// Não precisamos fazer nada por não elementos
	if (dest.nodeType! == 1) {
		Retorna;
	}

	// clearAttributes remove os atributos que não queremos,
	// mas também remove os eventos attachEvent, que * queremos *
	if (dest.clearAttributes) {
		dest.clearAttributes ();
	}

	// mergeAttributes, por outro lado, só é mesclado novamente no
	// atributos originais, não os eventos
	if (dest.mergeAttributes) {
		dest.mergeAttributes (src);
	}

	nodeName = dest.nodeName.toLowerCase ();

	// IE6-8 falha ao clonar filhos dentro de elementos de objeto que usam
	// o valor do atributo classid proprietário (em vez do tipo
	// attribute) para identificar o tipo de conteúdo a ser exibido
	if (nodeName === "objeto") {
		dest.outerHTML = src.outerHTML;

	} else if (nodeName === "input" && (src.type === "caixa de seleção" || src.type === "radio")) {
		// O IE6-8 falha ao manter o estado marcado de uma caixa de seleção clonada
		// ou botão de opção. Pior, o IE6-7 falha ao fornecer o elemento clonado
		// uma aparência verificada se o valor defaultChecked também não estiver definido
		if (src.checked) {
			dest.defaultChecked = dest.checked = src.checked;
		}

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}

	// Event data gets referenced instead of copied if the expando
	// gets copied too
	dest.removeAttribute( jQuery.expando );
}

jQuery.buildFragment = function( args, nodes, scripts ) {
	var fragment, cacheable, cacheresults, doc;

  // nodes may contain either an explicit document object,
  // a jQuery collection or context object.
  // If nodes[0] contains a valid object to assign to doc
  if ( nodes && nodes[0] ) {
    doc = nodes[0].ownerDocument || nodes[0];
  }

  // Ensure that an attr object doesn't incorrectly stand in as a document object
	// Chrome and Firefox seem to allow this to occur and will throw exception
	// Fixes #8950
	if ( !doc.createDocumentFragment ) {
		doc = document;
	}

	// Only cache "small" (1/2 KB) HTML strings that are associated with the main document
	// Cloning options loses the selected state, so don't cache them
	// IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
	// Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
	if ( args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
		args[0].charAt(0) === "<" && !rnocache.test( args[0] ) && (jQuery.support.checkClone || !rchecked.test( args[0] )) ) {

		cacheable = true;

		cacheresults = jQuery.fragments[ args[0] ];
		if ( cacheresults && cacheresults !== 1 ) {
			fragment = cacheresults;
		}
	}

	if ( !fragment ) {
		fragment = doc.createDocumentFragment();
		jQuery.clean( args, doc, fragment, scripts );
	}

	if ( cacheable ) {
		jQuery.fragments[ args[0] ] = cacheresults ? fragment : 1;
	}

	return { fragment: fragment, cacheable: cacheable };
};

jQuery.fragments = {};

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var ret = [],
			insert = jQuery( selector ),
			parent = this.length === 1 && this[0].parentNode;

		if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
			insert[ original ]( this[0] );
			return this;

		} else {
			for ( var i = 0, l = insert.length; i < l; i++ ) {
				var elems = (i > 0 ? this.clone(true) : this).get();
				jQuery( insert[i] )[ original ]( elems );
				ret = ret.concat( elems );
			}

			return this.pushStack( ret, name, insert.selector );
		}
	};
});

function getAll( elem ) {
	if ( "getElementsByTagName" in elem ) {
		return elem.getElementsByTagName( "*" );

	} else if ( "querySelectorAll" in elem ) {
		return elem.querySelectorAll( "*" );

	} else {
		return [];
	}
}

// Used in clean, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( elem.type === "checkbox" || elem.type === "radio" ) {
		elem.defaultChecked = elem.checked;
	}
}
// Finds all inputs and passes them to fixDefaultChecked
function findInputs( elem ) {
	if ( jQuery.nodeName( elem, "input" ) ) {
		fixDefaultChecked( elem );
	} else if ( "getElementsByTagName" in elem ) {
		jQuery.grep( elem.getElementsByTagName("input"), fixDefaultChecked );
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var clone = elem.cloneNode(true),
				srcElements,
				destElements,
				i;

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {
			// IE copies events bound via attachEvent when using cloneNode.
			// Calling detachEvent on the clone will also remove the events
			// from the original. In order to get around this, we use some
			// proprietary methods to clear the events. Thanks to MooTools
			// guys for this hotness.

			cloneFixAttributes( elem, clone );

			// Using Sizzle here is crazy slow, so we use getElementsByTagName
			// instead
			srcElements = getAll( elem );
			destElements = getAll( clone );

			// Weird iteration because IE will replace the length property
			// with an element if you are cloning the body and one of the
			// elements on the page has a name or id of "length"
			for ( i = 0; srcElements[i]; ++i ) {
				cloneFixAttributes( srcElements[i], destElements[i] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			cloneCopyEvent( elem, clone );

			if ( deepDataAndEvents ) {
				srcElements = getAll( elem );
				destElements = getAll( clone );

				for ( i = 0; srcElements[i]; ++i ) {
					cloneCopyEvent( srcElements[i], destElements[i] );
				}
			}
		}

		srcElements = destElements = null;

		// Return the cloned set
		return clone;
	},

	clean: function( elems, context, fragment, scripts ) {
		var checkScriptType;

		context = context || document;

		// !context.createElement fails in IE with an error but returns typeof 'object'
		if ( typeof context.createElement === "undefined" ) {
			context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
		}

		var ret = [], j;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( typeof elem === "number" ) {
				elem += "";
			}

			if ( !elem ) {
				continue;
			}

			// Convert html string into DOM nodes
			if ( typeof elem === "string" ) {
				if ( !rhtml.test( elem ) ) {
					elem = context.createTextNode( elem );
				} else {
					// Fix "XHTML"-style tags in all browsers
					elem = elem.replace(rxhtmlTag, "<$1></$2>");

					// Trim whitespace, otherwise indexOf won't work as expected
					var tag = (rtagName.exec( elem ) || ["", ""])[1].toLowerCase(),
						wrap = wrapMap[ tag ] || wrapMap._default,
						depth = wrap[0],
						div = context.createElement("div");

					// Go to html and back, then peel off extra wrappers
					div.innerHTML = wrap[1] + elem + wrap[2];

					// Move to the right depth
					while ( depth-- ) {
						div = div.lastChild;
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						var hasBody = rtbody.test(elem),
							tbody = tag === "table" && !hasBody ?
								div.firstChild && div.firstChild.childNodes :

								// String was a bare <thead> or <tfoot>
								wrap[1] === "<table>" && !hasBody ?
									div.childNodes :
									[];

						for ( j = tbody.length - 1; j >= 0 ; --j ) {
							if ( jQuery.nodeName( tbody[ j ], "tbody" ) && !tbody[ j ].childNodes.length ) {
								tbody[ j ].parentNode.removeChild( tbody[ j ] );
							}
						}
					}

					// IE completely kills leading whitespace when innerHTML is used
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						div.insertBefore( context.createTextNode( rleadingWhitespace.exec(elem)[0] ), div.firstChild );
					}

					elem = div.childNodes;
				}
			}

			// Resets defaultChecked for any radios and checkboxes
			// about to be appended to the DOM in IE 6/7 (#8060)
			var len;
			if ( !jQuery.support.appendChecked ) {
				if ( elem[0] && typeof (len = elem.length) === "number" ) {
					for ( j = 0; j < len; j++ ) {
						findInputs( elem[j] );
					}
				} else {
					findInputs( elem );
				}
			}

			if ( elem.nodeType ) {
				ret.push( elem );
			} else {
				ret = jQuery.merge( ret, elem );
			}
		}

		if ( fragment ) {
			checkScriptType = function( elem ) {
				return !elem.type || rscriptType.test( elem.type );
			};
			for ( i = 0; ret[i]; i++ ) {
				if ( scripts && jQuery.nodeName( ret[i], "script" ) && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript") ) {
					scripts.push( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );

				} else {
					if ( ret[i].nodeType === 1 ) {
						var jsTags = jQuery.grep( ret[i].getElementsByTagName( "script" ), checkScriptType );

						ret.splice.apply( ret, [i + 1, 0].concat( jsTags ) );
					}
					fragment.appendChild( ret[i] );
				}
			}
		}

		return ret;
	},

	cleanData: function( elems ) {
		var data, id, cache = jQuery.cache, internalKey = jQuery.expando, special = jQuery.event.special,
			deleteExpando = jQuery.support.deleteExpando;

		for ( var i = 0, elem; (elem = elems[i]) != null; i++ ) {
			if ( elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()] ) {
				continue;
			}

			id = elem[ jQuery.expando ];

			if ( id ) {
				data = cache[ id ] && cache[ id ][ internalKey ];

				if ( data && data.events ) {
					for ( var type in data.events ) {
						if ( special[ type ] ) {
							jQuery.event.remove( elem, type );

						// This is a shortcut to avoid jQuery.event.remove's overhead
						} else {
							jQuery.removeEvent( elem, type, data.handle );
						}
					}

					// Null the DOM reference to avoid IE6/7/8 leak (#7054)
					if ( data.handle ) {
						data.handle.elem = null;
					}
				}

				if ( deleteExpando ) {
					delete elem[ jQuery.expando ];

				} else if ( elem.removeAttribute ) {
					elem.removeAttribute( jQuery.expando );
				}

				delete cache[ id ];
			}
		}
	}
});

function evalScript( i, elem ) {
	if ( elem.src ) {
		jQuery.ajax({
			url: elem.src,
			async: false,
			dataType: "script"
		});
	} else {
		jQuery.globalEval( ( elem.text || elem.textContent || elem.innerHTML || "" ).replace( rcleanScript, "/*$0*/" ) );
	}

	if ( elem.parentNode ) {
		elem.parentNode.removeChild( elem );
	}
}



var ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity=([^)]*)/,
	// fixed for IE9, see #8346
	rupper = /([A-Z]|^ms)/g,
	rnumpx = /^-?\d+(?:px)?$/i,
	rnum = /^-?\d/,
	rrelNum = /^[+\-]=/,
	rrelNumFilter = /[^+\-\.\de]+/g,

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssWidth = [ "Left", "Right" ],
	cssHeight = [ "Top", "Bottom" ],
	curCSS,

	getComputedStyle,
	currentStyle;

jQuery.fn.css = function( name, value ) {
	// Setting 'undefined' is a no-op
	if ( arguments.length === 2 && value === undefined ) {
		return this;
	}

	return jQuery.access( this, name, value, true, function( elem, name, value ) {
		return value !== undefined ?
			jQuery.style( elem, name, value ) :
			jQuery.css( elem, name );
	});
};

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity", "opacity" );
					return ret === "" ? "1" : ret;

				} else {
					return elem.style.opacity;
				}
			}
		}
	},

	// Exclude the following css properties to add px
	cssNumber: {
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, origName = jQuery.camelCase( name ),
			style = elem.style, hooks = jQuery.cssHooks[ origName ];

		name = jQuery.cssProps[ origName ] || origName;

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Make sure that NaN and null values aren't set. See: #7116
			if ( type === "number" && isNaN( value ) || value == null ) {
				return;
			}

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && rrelNum.test( value ) ) {
				value = +value.replace( rrelNumFilter, "" ) + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value )) !== undefined ) {
				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra ) {
		var ret, hooks;

		// Make sure that we're working with the right name
		name = jQuery.camelCase( name );
		hooks = jQuery.cssHooks[ name ];
		name = jQuery.cssProps[ name ] || name;

		// cssFloat needs a special treatment
		if ( name === "cssFloat" ) {
			name = "float";
		}

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks && (ret = hooks.get( elem, true, extra )) !== undefined ) {
			return ret;

		// Otherwise, if a way to get the computed value exists, use that
		} else if ( curCSS ) {
			return curCSS( elem, name );
		}
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations
	swap: function( elem, options, callback ) {
		var old = {};

		// Remember the old values, and insert the new ones
		for ( var name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		callback.call( elem );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	}
});

// DEPRECATED, Use jQuery.css() instead
jQuery.curCSS = jQuery.css;

jQuery.each(["height", "width"], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			var val;

			if ( computed ) {
				if ( elem.offsetWidth !== 0 ) {
					return getWH( elem, name, extra );
				} else {
					jQuery.swap( elem, cssShow, function() {
						val = getWH( elem, name, extra );
					});
				}

				return val;
			}
		},

		set: function( elem, value ) {
			if ( rnumpx.test( value ) ) {
				// ignore negative width and height values #1599
				value = parseFloat( value );

				if ( value >= 0 ) {
					return value + "px";
				}

			} else {
				return value;
			}
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( parseFloat( RegExp.$1 ) / 100 ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle;

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// Set the alpha filter to set the opacity
			var opacity = jQuery.isNaN( value ) ?
				"" :
				"alpha(opacity=" + value * 100 + ")",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery(function() {
	// This hook cannot be added until DOM ready because the support test
	// for it is not run until after DOM ready
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// Work around by temporarily setting element display to inline-block
				var ret;
				jQuery.swap( elem, { "display": "inline-block" }, function() {
					if ( computed ) {
						ret = curCSS( elem, "margin-right", "marginRight" );
					} else {
						ret = elem.style.marginRight;
					}
				});
				return ret;
			}
		};
	}
});

if ( document.defaultView && document.defaultView.getComputedStyle ) {
	getComputedStyle = function( elem, name ) {
		var ret, defaultView, computedStyle;

		name = name.replace( rupper, "-$1" ).toLowerCase();

		if ( !(defaultView = elem.ownerDocument.defaultView) ) {
			return undefined;
		}

		if ( (computedStyle = defaultView.getComputedStyle( elem, null )) ) {
			ret = computedStyle.getPropertyValue( name );
			if ( ret === "" && !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
				ret = jQuery.style( elem, name );
			}
		}

		return ret;
	};
}

if ( document.documentElement.currentStyle ) {
	currentStyle = function( elem, name ) {
		var left,
			ret = elem.currentStyle && elem.currentStyle[ name ],
			rsLeft = elem.runtimeStyle && elem.runtimeStyle[ name ],
			style = elem.style;

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		if ( !rnumpx.test( ret ) && rnum.test( ret ) ) {
			// Remember the original values
			left = style.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				elem.runtimeStyle.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : (ret || 0);
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				elem.runtimeStyle.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

curCSS = getComputedStyle || currentStyle;

function getWH( elem, name, extra ) {

	// Start with offset property
	var val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		which = name === "width" ? cssWidth : cssHeight;

	if ( val > 0 ) {
		if ( extra !== "border" ) {
			jQuery.each( which, function() {
				if ( !extra ) {
					val -= parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
				}
				if ( extra === "margin" ) {
					val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
				} else {
					val -= parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
				}
			});
		}

		return val + "px";
	}

	// Fall back to computed then uncomputed css if necessary
	val = curCSS( elem, name, name );
	if ( val < 0 || val == null ) {
		val = elem.style[ name ] || 0;
	}
	// Normalize "", auto, and prepare for extra
	val = parseFloat( val ) || 0;

	// Add padding, border, margin
	if ( extra ) {
		jQuery.each( which, function() {
			val += parseFloat( jQuery.css( elem, "padding" + this ) ) || 0;
			if ( extra !== "padding" ) {
				val += parseFloat( jQuery.css( elem, "border" + this + "Width" ) ) || 0;
			}
			if ( extra === "margin" ) {
				val += parseFloat( jQuery.css( elem, extra + this ) ) || 0;
			}
		});
	}

	return val + "px";
}

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		var width = elem.offsetWidth,
			height = elem.offsetHeight;

		return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rhash = /#.*$/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rquery = /\?/,
	rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	rselectTextarea = /^(?:select|textarea)/i,
	rspacesAjax = /\s+/,
	rts = /([?&])_=[^&]*/,
	rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Document location
	ajaxLocation,

	// Document location segments
	ajaxLocParts;

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		if ( jQuery.isFunction( func ) ) {
			var dataTypes = dataTypeExpression.toLowerCase().split( rspacesAjax ),
				i = 0,
				length = dataTypes.length,
				dataType,
				list,
				placeBefore;

			// For each dataType in the dataTypeExpression
			for(; i < length; i++ ) {
				dataType = dataTypes[ i ];
				// We control if we're asked to add before
				// any existing element
				placeBefore = /^\+/.test( dataType );
				if ( placeBefore ) {
					dataType = dataType.substr( 1 ) || "*";
				}
				list = structure[ dataType ] = structure[ dataType ] || [];
				// then we add to the structure accordingly
				list[ placeBefore ? "unshift" : "push" ]( func );
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR,
		dataType /* internal */, inspected /* internal */ ) {

	dataType = dataType || options.dataTypes[ 0 ];
	inspected = inspected || {};

	inspected[ dataType ] = true;

	var list = structure[ dataType ],
		i = 0,
		length = list ? list.length : 0,
		executeOnly = ( structure === prefilters ),
		selection;

	for(; i < length && ( executeOnly || !selection ); i++ ) {
		selection = list[ i ]( options, originalOptions, jqXHR );
		// If we got redirected to another dataType
		// we try there if executing only and not done already
		if ( typeof selection === "string" ) {
			if ( !executeOnly || inspected[ selection ] ) {
				selection = undefined;
			} else {
				options.dataTypes.unshift( selection );
				selection = inspectPrefiltersOrTransports(
						structure, options, originalOptions, jqXHR, selection, inspected );
			}
		}
	}
	// If we're only executing or nothing was selected
	// we try the catchall dataType if not done already
	if ( ( executeOnly || !selection ) && !inspected[ "*" ] ) {
		selection = inspectPrefiltersOrTransports(
				structure, options, originalOptions, jqXHR, "*", inspected );
	}
	// unnecessary when only executing (prefilters)
	// but it'll be ignored by the caller in that case
	return selection;
}

jQuery.fn.extend({
	load: function( url, params, callback ) {
		if ( typeof url !== "string" && _load ) {
			return _load.apply( this, arguments );

		// Don't do a request if no elements are being requested
		} else if ( !this.length ) {
			return this;
		}

		var off = url.indexOf( " " );
		if ( off >= 0 ) {
			var selector = url.slice( off, url.length );
			url = url.slice( 0, off );
		}

		// Default to a GET request
		var type = "GET";

		// If the second parameter was provided
		if ( params ) {
			// If it's a function
			if ( jQuery.isFunction( params ) ) {
				// We assume that it's the callback
				callback = params;
				params = undefined;

			// Otherwise, build a param string
			} else if ( typeof params === "object" ) {
				params = jQuery.param( params, jQuery.ajaxSettings.traditional );
				type = "POST";
			}
		}

		var self = this;

		// Request the remote document
		jQuery.ajax({
			url: url,
			type: type,
			dataType: "html",
			data: params,
			// Complete callback (responseText is used internally)
			complete: function( jqXHR, status, responseText ) {
				// Store the response as specified by the jqXHR object
				responseText = jqXHR.responseText;
				// If successful, inject the HTML into all the matched elements
				if ( jqXHR.isResolved() ) {
					// #4825: Get the actual response in case
					// a dataFilter is present in ajaxSettings
					jqXHR.done(function( r ) {
						responseText = r;
					});
					// See if a selector was specified
					self.html( selector ?
						// Create a dummy div to hold the results
						jQuery("<div>")
							// inject the contents of the document in, removing the scripts
							// to avoid any 'Permission Denied' errors in IE
							.append(responseText.replace(rscript, ""))

							// Locate the specified elements
							.find(selector) :

						// If not, just inject the full result
						responseText );
				}

				if ( callback ) {
					self.each( callback, [ responseText, status, jqXHR ] );
				}
			}
		});

		return this;
	},

	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},

	serializeArray: function() {
		return this.map(function(){
			return this.elements ? jQuery.makeArray( this.elements ) : this;
		})
		.filter(function(){
			return this.name && !this.disabled &&
				( this.checked || rselectTextarea.test( this.nodeName ) ||
					rinput.test( this.type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val, i ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( "ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split( " " ), function( i, o ){
	jQuery.fn[ o ] = function( f ){
		return this.bind( o, f );
	};
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			type: method,
			url: url,
			data: data,
			success: callback,
			dataType: type
		});
	};
});

jQuery.extend({

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function ( target, settings ) {
		if ( !settings ) {
			// Only one parameter, we extend ajaxSettings
			settings = target;
			target = jQuery.extend( true, jQuery.ajaxSettings, settings );
		} else {
			// target was provided, we extend into it
			jQuery.extend( true, target, jQuery.ajaxSettings, settings );
		}
		// Flatten fields we don't want deep extended
		for( var field in { context: 1, url: 1 } ) {
			if ( field in settings ) {
				target[ field ] = settings[ field ];
			} else if( field in jQuery.ajaxSettings ) {
				target[ field ] = jQuery.ajaxSettings[ field ];
			}
		}
		return target;
	},

	ajaxSettings: {
		url: ajaxLocation,
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		type: "GET",
		contentType: "application/x-www-form-urlencoded",
		processData: true,
		async: true,
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		traditional: false,
		headers: {},
		*/

		accepts: {
			xml: "application/xml, text/xml",
			html: "text/html",
			text: "text/plain",
			json: "application/json, text/javascript",
			"*": "*/*"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText"
		},

		// List of data converters
		// 1) key format is "source_type destination_type" (a single space in-between)
		// 2) the catchall symbol "*" can be used for source_type
		converters: {

			// Convert anything to text
			"* text": window.String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		}
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events
			// It's the callbackContext if one was provided in the options
			// and if it's a DOM node or a jQuery collection
			globalEventContext = callbackContext !== s &&
				( callbackContext.nodeType || callbackContext instanceof jQuery ) ?
						jQuery( callbackContext ) : jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery._Deferred(),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// ifModified key
			ifModifiedKey,
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// Response headers
			responseHeadersString,
			responseHeaders,
			// transport
			transport,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// The jqXHR state
			state = 0,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Fake xhr
			jqXHR = {

				readyState: 0,

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( !state ) {
						var lname = name.toLowerCase();
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match === undefined ? null : match;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					statusText = statusText || "abort";
					if ( transport ) {
						transport.abort( statusText );
					}
					done( 0, statusText );
					return this;
				}
			};

		// Callback for when everything is done
		// It is defined here because jslint complains if it is declared
		// at the end of the function (which would be more logical and readable)
		function done( status, statusText, responses, headers ) {

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status ? 4 : 0;

			var isSuccess,
				success,
				error,
				response = responses ? ajaxHandleResponses( s, jqXHR, responses ) : undefined,
				lastModified,
				etag;

			// If successful, handle type chaining
			if ( status >= 200 && status < 300 || status === 304 ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {

					if ( ( lastModified = jqXHR.getResponseHeader( "Last-Modified" ) ) ) {
						jQuery.lastModified[ ifModifiedKey ] = lastModified;
					}
					if ( ( etag = jqXHR.getResponseHeader( "Etag" ) ) ) {
						jQuery.etag[ ifModifiedKey ] = etag;
					}
				}

				// If not modified
				if ( status === 304 ) {

					statusText = "notmodified";
					isSuccess = true;

				// If we have data
				} else {

					try {
						success = ajaxConvert( s, response );
						statusText = "success";
						isSuccess = true;
					} catch(e) {
						// We have a parsererror
						statusText = "parsererror";
						error = e;
					}
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if( !statusText || status ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = statusText;

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajax" + ( isSuccess ? "Success" : "Error" ),
						[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.resolveWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		// Attach deferreds
		deferred.promise( jqXHR );
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;
		jqXHR.complete = completeDeferred.done;

		// Status-dependent callbacks
		jqXHR.statusCode = function( map ) {
			if ( map ) {
				var tmp;
				if ( state < 2 ) {
					for( tmp in map ) {
						statusCode[ tmp ] = [ statusCode[tmp], map[tmp] ];
					}
				} else {
					tmp = map[ jqXHR.status ];
					jqXHR.then( tmp, tmp );
				}
			}
			return this;
		};

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// We also use the url parameter if available
		s.url = ( ( url || s.url ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().split( rspacesAjax );

		// Determine if a cross-domain request is in order
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] != ajaxLocParts[ 1 ] || parts[ 2 ] != ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? 80 : 443 ) ) !=
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? 80 : 443 ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefiler, stop there
		if ( state === 2 ) {
			return false;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.data;
			}

			// Get ifModifiedKey before adding the anti-cache parameter
			ifModifiedKey = s.url;

			// Add anti-cache in url if needed
			if ( s.cache === false ) {

				var ts = jQuery.now(),
					// try replacing _= if it is there
					ret = s.url.replace( rts, "$1_=" + ts );

				// if nothing was replaced, add timestamp to the end
				s.url = ret + ( (ret === s.url ) ? ( rquery.test( s.url ) ? "&" : "?" ) + "_=" + ts : "" );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			ifModifiedKey = ifModifiedKey || s.url;
			if ( jQuery.lastModified[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ ifModifiedKey ] );
			}
			if ( jQuery.etag[ ifModifiedKey ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ ifModifiedKey ] );
			}
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", */*; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
				// Abort if not done already
				jqXHR.abort();
				return false;

		}

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;
			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout( function(){
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch (e) {
				// Propagate exception as error if not done
				if ( status < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					jQuery.error( e );
				}
			}
		}

		return jqXHR;
	},

	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a, traditional ) {
		var s = [],
			add = function( key, value ) {
				// If value is a function, invoke it and return its value
				value = jQuery.isFunction( value ) ? value() : value;
				s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
			};

		// Set traditional to true for jQuery <= 1.3.2 behavior.
		if ( traditional === undefined ) {
			traditional = jQuery.ajaxSettings.traditional;
		}

		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});

		} else {
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( var prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}

		// Return the resulting serialization
		return s.join( "&" ).replace( r20, "+" );
	}
});

function buildParams( prefix, obj, traditional, add ) {
	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// If array item is non-scalar (array or object), encode its
				// numeric index to resolve deserialization ambiguity issues.
				// Note that rack (as of 1.0.0) can't currently deserialize
				// nested arrays properly, and attempting to do so may cause
				// a server error. Possible fixes are to modify rack's
				// deserialization algorithm or to provide an option or flag
				// to force array serialization to be shallow.
				buildParams( prefix + "[" + ( typeof v === "object" || jQuery.isArray(v) ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && obj != null && typeof obj === "object" ) {
		// Serialize object item.
		for ( var name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// This is still on the jQuery object... for now
// Want to move this to jQuery.ajax some day
jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {}

});

/* Handles responses to an ajax request:
 * - sets all responseXXX fields accordingly
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var contents = s.contents,
		dataTypes = s.dataTypes,
		responseFields = s.responseFields,
		ct,
		type,
		finalDataType,
		firstDataType;

	// Fill responseXXX fields
	for( type in responseFields ) {
		if ( type in responses ) {
			jqXHR[ responseFields[type] ] = responses[ type ];
		}
	}

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "content-type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

// Chain conversions given the request and the original response
function ajaxConvert( s, response ) {

	// Apply the dataFilter if provided
	if ( s.dataFilter ) {
		response = s.dataFilter( response, s.dataType );
	}

	var dataTypes = s.dataTypes,
		converters = {},
		i,
		key,
		length = dataTypes.length,
		tmp,
		// Current and previous dataTypes
		current = dataTypes[ 0 ],
		prev,
		// Conversion expression
		conversion,
		// Conversion function
		conv,
		// Conversion functions (transitive conversion)
		conv1,
		conv2;

	// For each dataType in the chain
	for( i = 1; i < length; i++ ) {

		// Create converters map
		// with lowercased keys
		if ( i === 1 ) {
			for( key in s.converters ) {
				if( typeof key === "string" ) {
					converters[ key.toLowerCase() ] = s.converters[ key ];
				}
			}
		}

		// Get the dataTypes
		prev = current;
		current = dataTypes[ i ];

		// If current is auto dataType, update it to prev
		if( current === "*" ) {
			current = prev;
		// If no auto and dataTypes are actually different
		} else if ( prev !== "*" && prev !== current ) {

			// Get the converter
			conversion = prev + " " + current;
			conv = converters[ conversion ] || converters[ "* " + current ];

			// If there is no direct converter, search transitively
			if ( !conv ) {
				conv2 = undefined;
				for( conv1 in converters ) {
					tmp = conv1.split( " " );
					if ( tmp[ 0 ] === prev || tmp[ 0 ] === "*" ) {
						conv2 = converters[ tmp[1] + " " + current ];
						if ( conv2 ) {
							conv1 = converters[ conv1 ];
							if ( conv1 === true ) {
								conv = conv2;
							} else if ( conv2 === true ) {
								conv = conv1;
							}
							break;
						}
					}
				}
			}
			// If we found no converter, dispatch an error
			if ( !( conv || conv2 ) ) {
				jQuery.error( "No conversion from " + conversion.replace(" "," to ") );
			}
			// If found converter is not an equivalence
			if ( conv !== true ) {
				// Convert with 1 or 2 converters accordingly
				response = conv ? conv( response ) : conv2( conv1(response) );
			}
		}
	}
	return response;
}




var jsc = jQuery.now(),
	jsre = /(\=)\?(&|$)|\?\?/i;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		return jQuery.expando + "_" + ( jsc++ );
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var inspectData = s.contentType === "application/x-www-form-urlencoded" &&
		( typeof s.data === "string" );

	if ( s.dataTypes[ 0 ] === "jsonp" ||
		s.jsonp !== false && ( jsre.test( s.url ) ||
				inspectData && jsre.test( s.data ) ) ) {

		var responseContainer,
			jsonpCallback = s.jsonpCallback =
				jQuery.isFunction( s.jsonpCallback ) ? s.jsonpCallback() : s.jsonpCallback,
			previous = window[ jsonpCallback ],
			url = s.url,
			data = s.data,
			replace = "$1" + jsonpCallback + "$2";

		if ( s.jsonp !== false ) {
			url = url.replace( jsre, replace );
			if ( s.url === url ) {
				if ( inspectData ) {
					data = data.replace( jsre, replace );
				}
				if ( s.data === data ) {
					// Add callback manually
					url += (/\?/.test( url ) ? "&" : "?") + s.jsonp + "=" + jsonpCallback;
				}
			}
		}

		s.url = url;
		s.data = data;

		// Install callback
		window[ jsonpCallback ] = function( response ) {
			responseContainer = [ response ];
		};

		// Clean-up function
		jqXHR.always(function() {
			// Set callback back to previous value
			window[ jsonpCallback ] = previous;
			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( previous ) ) {
				window[ jsonpCallback ]( responseContainer[ 0 ] );
			}
		});

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( jsonpCallback + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Delegate to script
		return "script";
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /javascript|ecmascript/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || document.getElementsByTagName( "head" )[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = "async";

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( head && script.parentNode ) {
							head.removeChild( script );
						}

						// Dereference the script
						script = undefined;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};
				// Use insertBefore instead of appendChild  to circumvent an IE6 bug.
				// This arises when a base node is used (#2709 and #4378).
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( 0, 1 );
				}
			}
		};
	}
});




var // #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject ? function() {
		// Abort all pending requests
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( 0, 1 );
		}
	} : false,
	xhrId = 0,
	xhrCallbacks;

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
(function( xhr ) {
	jQuery.extend( jQuery.support, {
		ajax: !!xhr,
		cors: !!xhr && ( "withCredentials" in xhr )
	});
})( jQuery.ajaxSettings.xhr() );

// Create transport if the browser can provide an xhr
if ( jQuery.support.ajax ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var xhr = s.xhr(),
						handle,
						i;

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( _ ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {

						var status,
							statusText,
							responseHeaders,
							responses,
							xml;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occured
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();
									responses = {};
									xml = xhr.responseXML;

									// Construct response list
									if ( xml && xml.documentElement /* #4958 */ ) {
										responses.xml = xml;
									}
									responses.text = xhr.responseText;

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					// if we're in sync mode or it's in cache
					// and has been retrieved directly (IE6 & IE7)
					// we need to manually fire the callback
					if ( !s.async || xhr.readyState === 4 ) {
						callback();
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback(0,1);
					}
				}
			};
		}
	});
}




var elemdisplay = {},
	iframe, iframeDoc,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
	timerId,
	fxAttrs = [
		// height animations
		[ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ],
		// width animations
		[ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ],
		// opacity animations
		[ "opacity" ]
	],
	fxNow,
	requestAnimationFrame = window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame;

jQuery.fn.extend({
	show: function( speed, easing, callback ) {
		var elem, display;

		if ( speed || speed === 0 ) {
			return this.animate( genFx("show", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				elem = this[i];

				if ( elem.style ) {
					display = elem.style.display;

					// Reset the inline display of this element to learn if it is
					// being hidden by cascaded rules or not
					if ( !jQuery._data(elem, "olddisplay") && display === "none" ) {
						display = elem.style.display = "";
					}

					// Set elements which have been overridden with display: none
					// in a stylesheet to whatever the default browser style is
					// for such an element
					if ( display === "" && jQuery.css( elem, "display" ) === "none" ) {
						jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
					}
				}
			}

			// Set the display of most of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				elem = this[i];

				if ( elem.style ) {
					display = elem.style.display;

					if ( display === "" || display === "none" ) {
						elem.style.display = jQuery._data(elem, "olddisplay") || "";
					}
				}
			}

			return this;
		}
	},

	hide: function( speed, easing, callback ) {
		if ( speed || speed === 0 ) {
			return this.animate( genFx("hide", 3), speed, easing, callback);

		} else {
			for ( var i = 0, j = this.length; i < j; i++ ) {
				if ( this[i].style ) {
					var display = jQuery.css( this[i], "display" );

					if ( display !== "none" && !jQuery._data( this[i], "olddisplay" ) ) {
						jQuery._data( this[i], "olddisplay", display );
					}
				}
			}

			// Set the display of the elements in a second loop
			// to avoid the constant reflow
			for ( i = 0; i < j; i++ ) {
				if ( this[i].style ) {
					this[i].style.display = "none";
				}
			}

			return this;
		}
	},

	// Save the old toggle function
	_toggle: jQuery.fn.toggle,

	toggle: function( fn, fn2, callback ) {
		var bool = typeof fn === "boolean";

		if ( jQuery.isFunction(fn) && jQuery.isFunction(fn2) ) {
			this._toggle.apply( this, arguments );

		} else if ( fn == null || bool ) {
			this.each(function() {
				var state = bool ? fn : jQuery(this).is(":hidden");
				jQuery(this)[ state ? "show" : "hide" ]();
			});

		} else {
			this.animate(genFx("toggle", 3), fn, fn2, callback);
		}

		return this;
	},

	fadeTo: function( speed, to, easing, callback ) {
		return this.filter(":hidden").css("opacity", 0).show().end()
					.animate({opacity: to}, speed, easing, callback);
	},

	animate: function( prop, speed, easing, callback ) {
		var optall = jQuery.speed(speed, easing, callback);

		if ( jQuery.isEmptyObject( prop ) ) {
			return this.each( optall.complete, [ false ] );
		}

		// Do not change referenced properties as per-property easing will be lost
		prop = jQuery.extend( {}, prop );

		return this[ optall.queue === false ? "each" : "queue" ](function() {
			// XXX 'this' does not always have a nodeName when running the
			// test suite

			if ( optall.queue === false ) {
				jQuery._mark( this );
			}

			var opt = jQuery.extend( {}, optall ),
				isElement = this.nodeType === 1,
				hidden = isElement && jQuery(this).is(":hidden"),
				name, val, p,
				display, e,
				parts, start, end, unit;

			// will store per property easing and be used to determine when an animation is complete
			opt.animatedProperties = {};

			for ( p in prop ) {

				// property name normalization
				name = jQuery.camelCase( p );
				if ( p !== name ) {
					prop[ name ] = prop[ p ];
					delete prop[ p ];
				}

				val = prop[ name ];

				// easing resolution: per property > opt.specialEasing > opt.easing > 'swing' (default)
				if ( jQuery.isArray( val ) ) {
					opt.animatedProperties[ name ] = val[ 1 ];
					val = prop[ name ] = val[ 0 ];
				} else {
					opt.animatedProperties[ name ] = opt.specialEasing && opt.specialEasing[ name ] || opt.easing || 'swing';
				}

				if ( val === "hide" && hidden || val === "show" && !hidden ) {
					return opt.complete.call( this );
				}

				if ( isElement && ( name === "height" || name === "width" ) ) {
					// Make sure that nothing sneaks out
					// Record all 3 overflow attributes because IE does not
					// change the overflow attribute when overflowX and
					// overflowY are set to the same value
					opt.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ];

					// Set display property to inline-block for height/width
					// animations on inline elements that are having width/height
					// animated
					if ( jQuery.css( this, "display" ) === "inline" &&
							jQuery.css( this, "float" ) === "none" ) {
						if ( !jQuery.support.inlineBlockNeedsLayout ) {
							this.style.display = "inline-block";

						} else {
							display = defaultDisplay( this.nodeName );

							// inline-level elements accept inline-block;
							// block-level elements need to be inline with layout
							if ( display === "inline" ) {
								this.style.display = "inline-block";

							} else {
								this.style.display = "inline";
								this.style.zoom = 1;
							}
						}
					}
				}
			}

			if ( opt.overflow != null ) {
				this.style.overflow = "hidden";
			}

			for ( p in prop ) {
				e = new jQuery.fx( this, opt, p );
				val = prop[ p ];

				if ( rfxtypes.test(val) ) {
					e[ val === "toggle" ? hidden ? "show" : "hide" : val ]();

				} else {
					parts = rfxnum.exec( val );
					start = e.cur();

					if ( parts ) {
						end = parseFloat( parts[2] );
						unit = parts[3] || ( jQuery.cssNumber[ p ] ? "" : "px" );

						// We need to compute starting value
						if ( unit !== "px" ) {
							jQuery.style( this, p, (end || 1) + unit);
							start = ((end || 1) / e.cur()) * start;
							jQuery.style( this, p, start + unit);
						}

						// If a +=/-= token was provided, we're doing a relative animation
						if ( parts[1] ) {
							end = ( (parts[ 1 ] === "-=" ? -1 : 1) * end ) + start;
						}

						e.custom( start, end, unit );

					} else {
						e.custom( start, val, "" );
					}
				}
			}

			// For JS strict compliance
			return true;
		});
	},

	stop: function( clearQueue, gotoEnd ) {
		if ( clearQueue ) {
			this.queue([]);
		}

		this.each(function() {
			var timers = jQuery.timers,
				i = timers.length;
			// clear marker counters if we know they won't be
			if ( !gotoEnd ) {
				jQuery._unmark( true, this );
			}
			while ( i-- ) {
				if ( timers[i].elem === this ) {
					if (gotoEnd) {
						// force the next step to be the last
						timers[i](true);
					}

					timers.splice(i, 1);
				}
			}
		});

		// start the next in the queue if the last step wasn't forced
		if ( !gotoEnd ) {
			this.dequeue();
		}

		return this;
	}

});

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout( clearFxNow, 0 );
	return ( fxNow = jQuery.now() );
}

function clearFxNow() {
	fxNow = undefined;
}

// Generate parameters to create a standard animation
function genFx( type, num ) {
	var obj = {};

	jQuery.each( fxAttrs.concat.apply([], fxAttrs.slice(0,num)), function() {
		obj[ this ] = type;
	});

	return obj;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show", 1),
	slideUp: genFx("hide", 1),
	slideToggle: genFx("toggle", 1),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.extend({
	speed: function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
		};

		opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
			opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

		// Queueing
		opt.old = opt.complete;
		opt.complete = function( noUnmark ) {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}

			if ( opt.queue !== false ) {
				jQuery.dequeue( this );
			} else if ( noUnmark !== false ) {
				jQuery._unmark( this );
			}
		};

		return opt;
	},

	easing: {
		linear: function( p, n, firstNum, diff ) {
			return firstNum + diff * p;
		},
		swing: function( p, n, firstNum, diff ) {
			return ((-Math.cos(p*Math.PI)/2) + 0.5) * diff + firstNum;
		}
	},

	timers: [],

	fx: function( elem, options, prop ) {
		this.options = options;
		this.elem = elem;
		this.prop = prop;

		options.orig = options.orig || {};
	}

});

jQuery.fx.prototype = {
	// Simple function for setting a style value
	update: function() {
		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		(jQuery.fx.step[this.prop] || jQuery.fx.step._default)( this );
	},

	// Get the current size
	cur: function() {
		if ( this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null) ) {
			return this.elem[ this.prop ];
		}

		var parsed,
			r = jQuery.css( this.elem, this.prop );
		// Empty strings, null, undefined and "auto" are converted to 0,
		// complex values such as "rotate(1rad)" are returned as is,
		// simple values such as "10px" are parsed to Float.
		return isNaN( parsed = parseFloat( r ) ) ? !r || r === "auto" ? 0 : r : parsed;
	},

	// Start an animation from one number to another
	custom: function( from, to, unit ) {
		var self = this,
			fx = jQuery.fx,
			raf;

		this.startTime = fxNow || createFxNow();
		this.start = from;
		this.end = to;
		this.unit = unit || this.unit || ( jQuery.cssNumber[ this.prop ] ? "" : "px" );
		this.now = this.start;
		this.pos = this.state = 0;

		function t( gotoEnd ) {
			return self.step(gotoEnd);
		}

		t.elem = this.elem;

		if ( t() && jQuery.timers.push(t) && !timerId ) {
			// Use requestAnimationFrame instead of setInterval if available
			if ( requestAnimationFrame ) {
				timerId = true;
				raf = function() {
					// When timerId gets set to null at any point, this stops
					if ( timerId ) {
						requestAnimationFrame( raf );
						fx.tick();
					}
				};
				requestAnimationFrame( raf );
			} else {
				timerId = setInterval( fx.tick, fx.interval );
			}
		}
	},

	// Simple 'show' function
	show: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.show = true;

		// Begin the animation
		// Make sure that we start at a small width/height to avoid any
		// flash of content
		this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());

		// Start by showing the element
		jQuery( this.elem ).show();
	},

	// Simple 'hide' function
	hide: function() {
		// Remember where we started, so that we can go back to it later
		this.options.orig[this.prop] = jQuery.style( this.elem, this.prop );
		this.options.hide = true;

		// Begin the animation
		this.custom(this.cur(), 0);
	},

	// Each step of an animation
	step: function( gotoEnd ) {
		var t = fxNow || createFxNow(),
			done = true,
			elem = this.elem,
			options = this.options,
			i, n;

		if ( gotoEnd || t >= options.duration + this.startTime ) {
			this.now = this.end;
			this.pos = this.state = 1;
			this.update();

			options.animatedProperties[ this.prop ] = true;

			for ( i in options.animatedProperties ) {
				if ( options.animatedProperties[i] !== true ) {
					done = false;
				}
			}

			if ( done ) {
				// Reset the overflow
				if ( options.overflow != null && !jQuery.support.shrinkWrapBlocks ) {

					jQuery.each( [ "", "X", "Y" ], function (index, value) {
						elem.style[ "overflow" + value ] = options.overflow[index];
					});
				}

				// Hide the element if the "hide" operation was done
				if ( options.hide ) {
					jQuery(elem).hide();
				}

				// Reset the properties, if the item has been hidden or shown
				if ( options.hide || options.show ) {
					for ( var p in options.animatedProperties ) {
						jQuery.style( elem, p, options.orig[p] );
					}
				}

				// Execute the complete function
				options.complete.call( elem );
			}

			return false;

		} else {
			// classical easing cannot be used with an Infinity duration
			if ( options.duration == Infinity ) {
				this.now = t;
			} else {
				n = t - this.startTime;
				this.state = n / options.duration;

				// Perform the easing function, defaults to swing
				this.pos = jQuery.easing[ options.animatedProperties[ this.prop ] ]( this.state, n, 0, 1, options.duration );
				this.now = this.start + ((this.end - this.start) * this.pos);
			}
			// Perform the next step of the animation
			this.update();
		}

		return true;
	}
};

jQuery.extend( jQuery.fx, {
	tick: function() {
		for ( var timers = jQuery.timers, i = 0 ; i < timers.length ; ++i ) {
			if ( !timers[i]() ) {
				timers.splice(i--, 1);
			}
		}

		if ( !timers.length ) {
			jQuery.fx.stop();
		}
	},

	interval: 13,

	stop: function() {
		clearInterval( timerId );
		timerId = null;
	},

	speeds: {
		slow: 600,
		fast: 200,
		// Default speed
		_default: 400
	},

	step: {
		opacity: function( fx ) {
			jQuery.style( fx.elem, "opacity", fx.now );
		},

		_default: function( fx ) {
			if ( fx.elem.style && fx.elem.style[ fx.prop ] != null ) {
				fx.elem.style[ fx.prop ] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
			} else {
				fx.elem[ fx.prop ] = fx.now;
			}
		}
	}
});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}

// Try to restore the default display value of an element
function defaultDisplay( nodeName ) {

	if ( !elemdisplay[ nodeName ] ) {

		var body = document.body,
			elem = jQuery( "<" + nodeName + ">" ).appendTo( body ),
			display = elem.css( "display" );

		elem.remove();

		// If the simple way fails,
		// get element's real default display by attaching it to a temp iframe
		if ( display === "none" || display === "" ) {
			// No iframe to use yet, so create it
			if ( !iframe ) {
				iframe = document.createElement( "iframe" );
				iframe.frameBorder = iframe.width = iframe.height = 0;
			}

			body.appendChild( iframe );

			// Create a cacheable copy of the iframe document on first call.
			// IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
			// document to it; WebKit & Firefox won't allow reusing the iframe document.
			if ( !iframeDoc || !iframe.createElement ) {
				iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
				iframeDoc.write( ( document.compatMode === "CSS1Compat" ? "<!doctype html>" : "" ) + "<html><body>" );
				iframeDoc.close();
			}

			elem = iframeDoc.createElement( nodeName );

			iframeDoc.body.appendChild( elem );

			display = jQuery.css( elem, "display" );

			body.removeChild( iframe );
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return elemdisplay[ nodeName ];
}




var rtable = /^t(?:able|d|h)$/i,
	rroot = /^(?:body|html)$/i;

if ( "getBoundingClientRect" in document.documentElement ) {
	jQuery.fn.offset = function( options ) {
		var elem = this[0], box;

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		try {
			box = elem.getBoundingClientRect();
		} catch(e) {}

		var doc = elem.ownerDocument,
			docElem = doc.documentElement;

		// Make sure we're not dealing with a disconnected DOM node
		if ( !box || !jQuery.contains( docElem, elem ) ) {
			return box ? { top: box.top, left: box.left } : { top: 0, left: 0 };
		}

		var body = doc.body,
			win = getWindow(doc),
			clientTop  = docElem.clientTop  || body.clientTop  || 0,
			clientLeft = docElem.clientLeft || body.clientLeft || 0,
			scrollTop  = win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop  || body.scrollTop,
			scrollLeft = win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft,
			top  = box.top  + scrollTop  - clientTop,
			left = box.left + scrollLeft - clientLeft;

		return { top: top, left: left };
	};

} else {
	jQuery.fn.offset = function( options ) {
		var elem = this[0];

		if ( options ) {
			return this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
		}

		if ( !elem || !elem.ownerDocument ) {
			return null;
		}

		if ( elem === elem.ownerDocument.body ) {
			return jQuery.offset.bodyOffset( elem );
		}

		jQuery.offset.initialize();

		var computedStyle,
			offsetParent = elem.offsetParent,
			prevOffsetParent = elem,
			doc = elem.ownerDocument,
			docElem = doc.documentElement,
			body = doc.body,
			defaultView = doc.defaultView,
			prevComputedStyle = defaultView ? defaultView.getComputedStyle( elem, null ) : elem.currentStyle,
			top = elem.offsetTop,
			left = elem.offsetLeft;

		while ( (elem = elem.parentNode) && elem !== body && elem !== docElem ) {
			if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
				break;
			}

			computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
			top  -= elem.scrollTop;
			left -= elem.scrollLeft;

			if ( elem === offsetParent ) {
				top  += elem.offsetTop;
				left += elem.offsetLeft;

				if ( jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName)) ) {
					top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
					left += parseFloat( computedStyle.borderLeftWidth ) || 0;
				}

				prevOffsetParent = offsetParent;
				offsetParent = elem.offsetParent;
			}

			if ( jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible" ) {
				top  += parseFloat( computedStyle.borderTopWidth  ) || 0;
				left += parseFloat( computedStyle.borderLeftWidth ) || 0;
			}

			prevComputedStyle = computedStyle;
		}

		if ( prevComputedStyle.position === "relative" || prevComputedStyle.position === "static" ) {
			top  += body.offsetTop;
			left += body.offsetLeft;
		}

		if ( jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed" ) {
			top  += Math.max( docElem.scrollTop, body.scrollTop );
			left += Math.max( docElem.scrollLeft, body.scrollLeft );
		}

		return { top: top, left: left };
	};
}

jQuery.offset = {
	initialize: function() {
		var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat( jQuery.css(body, "marginTop") ) || 0,
			html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";

		jQuery.extend( container.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" } );

		container.innerHTML = html;
		body.insertBefore( container, body.firstChild );
		innerDiv = container.firstChild;
		checkDiv = innerDiv.firstChild;
		td = innerDiv.nextSibling.firstChild.firstChild;

		this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
		this.doesAddBorderForTableAndCells = (td.offsetTop === 5);

		checkDiv.style.position = "fixed";
		checkDiv.style.top = "20px";

		// safari subtracts parent border width here which is 5px
		this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
		checkDiv.style.position = checkDiv.style.top = "";

		innerDiv.style.overflow = "hidden";
		innerDiv.style.position = "relative";

		this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);

		this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);

		body.removeChild( container );
		jQuery.offset.initialize = jQuery.noop;
	},

	bodyOffset: function( body ) {
		var top = body.offsetTop,
			left = body.offsetLeft;

		jQuery.offset.initialize();

		if ( jQuery.offset.doesNotIncludeMarginInBodyOffset ) {
			top  += parseFloat( jQuery.css(body, "marginTop") ) || 0;
			left += parseFloat( jQuery.css(body, "marginLeft") ) || 0;
		}

		return { top: top, left: left };
	},

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = (position === "absolute" || position === "fixed") && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if (options.top != null) {
			props.top = (options.top - curOffset.top) + curTop;
		}
		if (options.left != null) {
			props.left = (options.left - curOffset.left) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({
	position: function() {
		if ( !this[0] ) {
			return null;
		}

		var elem = this[0],

		// Get *real* offsetParent
		offsetParent = this.offsetParent(),

		// Get correct offsets
		offset       = this.offset(),
		parentOffset = rroot.test(offsetParent[0].nodeName) ? { top: 0, left: 0 } : offsetParent.offset();

		// Subtract element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		offset.top  -= parseFloat( jQuery.css(elem, "marginTop") ) || 0;
		offset.left -= parseFloat( jQuery.css(elem, "marginLeft") ) || 0;

		// Add offsetParent borders
		parentOffset.top  += parseFloat( jQuery.css(offsetParent[0], "borderTopWidth") ) || 0;
		parentOffset.left += parseFloat( jQuery.css(offsetParent[0], "borderLeftWidth") ) || 0;

		// Subtract the two offsets
		return {
			top:  offset.top  - parentOffset.top,
			left: offset.left - parentOffset.left
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || document.body;
			while ( offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static") ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( ["Left", "Top"], function( i, name ) {
	var method = "scroll" + name;

	jQuery.fn[ method ] = function( val ) {
		var elem, win;

		if ( val === undefined ) {
			elem = this[ 0 ];

			if ( !elem ) {
				return null;
			}

			win = getWindow( elem );

			// Return the scroll offset
			return win ? ("pageXOffset" in win) ? win[ i ? "pageYOffset" : "pageXOffset" ] :
				jQuery.support.boxModel && win.document.documentElement[ method ] ||
					win.document.body[ method ] :
				elem[ method ];
		}

		// Set the scroll offset
		return this.each(function() {
			win = getWindow( this );

			if ( win ) {
				win.scrollTo(
					!i ? val : jQuery( win ).scrollLeft(),
					 i ? val : jQuery( win ).scrollTop()
				);

			} else {
				this[ method ] = val;
			}
		});
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}




// Create width, height, innerHeight, innerWidth, outerHeight and outerWidth methods
jQuery.each([ "Height", "Width" ], function( i, name ) {

	var type = name.toLowerCase();

	// innerHeight and innerWidth
	jQuery.fn[ "inner" + name ] = function() {
		var elem = this[0];
		return elem && elem.style ?
			parseFloat( jQuery.css( elem, type, "padding" ) ) :
			null;
	};

	// outerHeight and outerWidth
	jQuery.fn[ "outer" + name ] = function( margin ) {
		var elem = this[0];
		return elem && elem.style ?
			parseFloat( jQuery.css( elem, type, margin ? "margin" : "border" ) ) :
			null;
	};

	jQuery.fn[ type ] = function( size ) {
		// Get window width or height
		var elem = this[0];
		if ( !elem ) {
			return size == null ? null : this;
		}

		if ( jQuery.isFunction( size ) ) {
			return this.each(function( i ) {
				var self = jQuery( this );
				self[ type ]( size.call( this, i, self[ type ]() ) );
			});
		}

		if ( jQuery.isWindow( elem ) ) {
			// Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
			// 3rd condition allows Nokia support, as it supports the docElem prop but not CSS1Compat
			var docElemProp = elem.document.documentElement[ "client" + name ];
			return elem.document.compatMode === "CSS1Compat" && docElemProp ||
				elem.document.body[ "client" + name ] || docElemProp;

		// Get document width or height
		} else if ( elem.nodeType === 9 ) {
			// Either scroll[Width/Height] or offset[Width/Height], whichever is greater
			return Math.max(
				elem.documentElement["client" + name],
				elem.body["scroll" + name], elem.documentElement["scroll" + name],
				elem.body["offset" + name], elem.documentElement["offset" + name]
			);

		// Get or set width or height on the element
		} else if ( size === undefined ) {
			var orig = jQuery.css( elem, type ),
				ret = parseFloat( orig );

			return jQuery.isNaN( ret ) ? orig : ret;

		// Set the width or height on the element (default to pixels if value is unitless)
		} else {
			return this.css( type, typeof size === "string" ? size : size + "px" );
		}
	};

});


// Expose jQuery to the global object
window.jQuery = window.$ = jQuery;
})(window);