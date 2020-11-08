
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    
    <xsl:output method="xhtml" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="/">
        <xsl:result-document href="arqsite/index.html">
        
        <html>
            <head>
                <title>Arqueossítios do Noroeste Português</title>
            </head>
            <body>
                <h1>Arqueossítios do Noroeste Português</h1>
                <ul>
                    <xsl:apply-templates select="//ARQELEM[not(CONCEL=preceding::CONCEL)]">
                        <xsl:sort select="normalize-space(CONCEL)"/>                           
                    </xsl:apply-templates>
                </ul>
            </body>
        </html>
        
        </xsl:result-document>
        <xsl:apply-templates select="//ARQELEM" mode="individual"/>
    </xsl:template>
    
    
    
    <!-- Templates para o índice -->
    
    <xsl:template match="ARQELEM">
        <xsl:variable name="c" select="CONCEL"/>
        <li>
            <xsl:value-of select="normalize-space(CONCEL)"/>
            <ul>
                <xsl:apply-templates select="//ARQELEM[CONCEL=$c]" mode="subindice">
                    <xsl:sort select="normalize-space(IDENTI)"/>
                </xsl:apply-templates>
            </ul>
            
        </li>
    </xsl:template>
    
    
    <xsl:template match="ARQELEM" mode="subindice">
        <li>
            <a href="arq{count(preceding-sibling::*)+1}.html">
                <xsl:value-of select="IDENTI"/>
            </a>
        </li>
    </xsl:template>
    
    
    
    
    <!-- Templates para o conteúdo -->
    <xsl:template match="ARQELEM" mode="individual">
        <xsl:result-document href="arqsite/arq{count(preceding-sibling::*)+1}.html">
        
            <html>
                <head>
                    <title>
                        <xsl:value-of select="IDENTI"/>
                    </title>
                </head>
                <body style="font-family: Arial;background-color:FBF2B4;padding:4px;margin:50px;line-height:30px">
                    
                    <p><b>Nome</b> : <xsl:value-of select="IDENTI"/></p>
                    <p><b>Localização</b> :  
                        <xsl:value-of select="LUGAR"/>,  
                        <xsl:value-of select="FREGUE"/>, 
                        <xsl:value-of select="CONCEL"/></p>        
                    
                    <p><b>Latitude</b> : <xsl:value-of select="LATITU"/> </p>
                    <p><b>Longitude</b> : <xsl:value-of select="LONGIT"/></p>
                    <p><b>Altitude</b> : <xsl:value-of select="ALTITU"/></p>
                    <p><b>Acesso</b> : <xsl:value-of select="ACESSO"/></p>
                    <p><b>Quadro</b> : <xsl:value-of select="QUADRO"/></p>
                    <p><b>Características</b> : <xsl:value-of select="DESARQ"/></p>
                    <p><b>Acesso</b> : <xsl:value-of select="ACESSO"/></p>
                    <p><b>Categoria</b> : <xsl:value-of select="INTERP"/></p>
                    <p><b>Depósito</b> : <xsl:value-of select="DEPOSI"/></p>
                    <p><b>Bibliografia</b> : </p>
                    
                    <xsl:for-each select="BIBLIO">
                        <xsl:value-of select="text()"/><br/>
                    </xsl:for-each>
                    
                    <p><b>Autor</b> : <xsl:value-of select="AUTOR"/></p>
                    <p><b>Data</b> : <xsl:value-of select="DATA"/></p>
            
                    <address>
                        [
                        <a href="index.html">Voltar ao índice</a>
                        ]
                    </address>
                </body>
            </html>
            
        
        </xsl:result-document>
    </xsl:template>
</xsl:stylesheet>